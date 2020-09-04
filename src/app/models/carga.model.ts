export class NuevaCarga {
  filesType: string;
  filesVersion: string;
  catLoad: File;
  actLoad: File;
  eqvLoad: File;
}

export class VerAuthor {
  email: string;
  // tslint:disable-next-line:variable-name
  first_name: string;
  // tslint:disable-next-line:variable-name
  last_name: string;
}

export class Carga {
    filesId: string;
    filesType: string;
    filesVersion: string;
    uploadedDate: Date;
    author: VerAuthor;
    status: string;
    statusDesc: string;
    processStep: string;
    buttons: string;
    nextStep: string;
    catLoad?: string;
    eqvLoad?: string;
    actLoad?: string;
    catTable?: string;
    eqvTable?: string;
    actTable?: string;
}

export class StatusCarga {
    valid: boolean;
    errors: any[];
    status: string;
    data: Carga;
}

export class ListaCargas {
    count: number;
    statusRequest: string;
    data: Carga[];
}

export class Movimiento {
  UploadFiles: number;
  // tslint:disable-next-line:variable-name
  cgo_act: string;
  // tslint:disable-next-line:variable-name
  descgo_act: string;
  // tslint:disable-next-line:variable-name
  mov_cant: number;
  // tslint:disable-next-line:variable-name
  move_type: string;
}

export class Seguimiento {
  statusRequest: string;
  dataSeguimiento: Carga;
  dataResultados: Movimiento[];
  // TODO: Actualizar clase
  dataDatos: any;
}






