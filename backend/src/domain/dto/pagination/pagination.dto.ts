export class PaginationDto {
  constructor(public readonly limit: number, public readonly skip: number) {}

  public static getObjectFromJson (json: {[key: string]: any}): [string?, PaginationDto?] {
    const {limit, skip} = json;

    if (!limit) return ['Limit is required', undefined];

    if (!skip) return ['Skip is required', undefined];

    return [undefined, new PaginationDto(limit, skip)];
  }
}
