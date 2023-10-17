export interface Usuario
{
    UsuarioId:string,
    UsuarioIdstr:string,
    Nombre:string,
    Apellidos:string,
    FechaNacimiento:string,
    SexoId:string,
    ImagenUsuario:string,
    DepartamentoId:string,
    Puesto:string,
    NumeroEmpleado:string,
    Correo:string,
    Telefono:string,
    Extension:string,
    Password:string,
    EsActivo:string,
    FechaCreacion:string,
    FechaUltimoIngreso:string,
    ClaveEmpleadoNetsuite:string,
    ClavePartnerNetsuite:string,
    NetsuiteUsuarioId:string
}

export interface autloginResponse
{
    UsuarioId:string,
    UsuarioIdstr:string,
    Nombre:string,
    Apellidos:string,
    FechaNacimiento:string,
    SexoId:string,
    ImagenUsuario:string,
    DepartamentoId:string,
    Puesto:string,
    NumeroEmpleado:string,
    Correo:string,
    Telefono:string,
    Extension:string,
    Password:string,
    EsActivo:string,
    FechaCreacion:string,
    FechaUltimoIngreso:string,
    ClaveEmpleadoNetsuite:string,
    ClavePartnerNetsuite:string,
    NetsuiteUsuarioId:string,
    Imagen:string,
    RhNetUsuarioId:string,
    BigDataUsuarioId:string,

    ok: boolean,
    message: string,
    Departamento:string,
    EsServicio:string,
    data:any,




}
export interface AuthResponse
{
    UsuarioId:string,
    Nombre:string,
    Apellido:string,
    Telefono:string,
    Extension:string,
    DepartamentoId:string,
    Correo:string,
    contrasenia:string,
    Activo:string,


    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
}
