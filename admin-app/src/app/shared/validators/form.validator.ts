import { FormGroup } from "@angular/forms";

export class FormValidator {
  public isValidField(
    form: FormGroup,
    field: string,
    formSubmitted: boolean
  ): boolean | null {
    // TODO: Basic Form
    //return form.controls[field].errors && form.controls[field].touched;

    if (formSubmitted && form.controls[field].invalid) return true;
    return false;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    // console.log(field + ' ' + Object.keys(form.controls[field].errors || {}));
    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case field === "terms" && "required":
          return "You should accept the terms and conditions";
        case "required":
          return `* This field is required`;
        case "minlength":
          return `This field must be ${errors["minlength"].requiredLength} characters`;
        case "email":
          return "Invalid email";
        default:
          return "";
      }
    }

    return "";
  }
}
