export class CreateRoleDto {

  constructor(
    public readonly name: string,
    public readonly description: string
  ) {}

  public static getObjectFromJson (json: {[key: string]: any}): [string?, CreateRoleDto?] {
    const { name, description } = json;

    if (!name || name.trim().length === 0) return ['Name is required', undefined];

    if (!description || description.trim().length === 0) return ['Description is required', undefined];

    return [undefined, new CreateRoleDto(name, description)];
  }
}