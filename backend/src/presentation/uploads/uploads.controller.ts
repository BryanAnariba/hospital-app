import path from 'node:path';
import fs from 'node:fs';
import { Request, Response } from "express";
import { UploadsService } from "./uploads.service";
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain/error/custom.error";

export class UploadsController {

  constructor(public readonly uploadsService: UploadsService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error});
    return res.status(500).json({error: error});
  }

  public uploadFile = (req: Request, res: Response) => {
    
    const {type, id} = req.params;
    const validTypes: string[] = ['hospitals', 'users', 'doctors'];

    if (!validTypes.includes(type.toLocaleLowerCase())) return res.status(400).json({error: 'Invalid type'});
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({error: 'No files were uploaded.'});    

    const image = req.files.image as UploadedFile;
    const name = image.name.split('.');
    const extImage = name[name.length - 1];
    
    const validExtentions: string[] = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtentions.includes(extImage)) return res.status(400).json({error: `Invalid Extention, must be ${validExtentions}`});

    // Gen File Name
    const fileName: string = `${Uuid.getUuid()}.${extImage}`;
    // console.log({fileName});
    // Path
    const imagePath = `./uploads/${type}/${fileName}`;

    // Save image in folder
    image.mv(imagePath, (error) => {
      if (error) {
        //console.log(error);
        return res.status(500).json({error: error});
      }

      // Save in db an return image
      this.uploadsService.saveImage(type, id, fileName)
        .then(data => {
          return res.status(201).json(data);
        })
        .catch(error => {
          this.handleError(error, res);
        })
    });
  }

  public getUploadFiles = (req: Request, res: Response) => {
    const {type, img} = req.params;
    if (!img) return res.status(400).json({error: 'Img is required'});

    const pathImg = path.join(__dirname, `../../../uploads/${type}/${img}`);

    if (!fs.existsSync(pathImg)) return res.status(200).sendFile(path.join(__dirname, `../../../uploads/img-not-found.png`));
    return res.status(200).sendFile(pathImg);
  }
}
