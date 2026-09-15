export class CreateVariantDto {
  //   idProduct!: number;
  name!: string;
  color!: string;
  idProduct!: number;
  stock!: number;
}

export class ResponseVariantDto {
  name!: string;
  color!: string;
  idProduct!: number;
  stock!: number;
  variantCode!: string;
}

export class UpdateVariantDto {
  //   idProduct!: number;
  name?: string;
  color?: string;
  idProduct?: number;
  stock?: number;
  variantCode?: string;
}
