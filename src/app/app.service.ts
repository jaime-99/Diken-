import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,BehaviorSubject, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category, Clase, Familia, Product, SubFamilia } from './app.models';
import { environment } from 'src/environments/environment';
import { autloginResponse } from './auth/interfaces/iUsuario';

export class Data {
    constructor(public categories: Category[],
                public compareList: Product[],
                public wishList: Product[],
                public cartList: Product[],
                public totalPrice: number,
                public totalCartCount: number,
                public CodigoDiken:string) { }
}
export class DataCarteraVencidaCharts{
constructor(public divisionesChart:any[],
            public porAntiguedadChar:any[],
            public CarteraPorAsesorChart:any[],
            public CarteraPorOficinaChart:any[],
            public CarteraPorClienteChart:any[],
            public TabluarCartera:any[]
    ){}

}

@Injectable({
    providedIn: 'root'
  })
export class AppService {
    private baseUrl: string = "https://www.dikeninternational.com/dikenecommerce/api";
    public search = new BehaviorSubject<string>("");
    public productList = new BehaviorSubject<any>([]);
    public Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  //
        null, //totalPrice,
        0, //totalCartCount
        ''
    )
    public datacarteraChart=new DataCarteraVencidaCharts(
        [],
        [],
        [],
        [],
        [],
        [])


    public _usuario: autloginResponse|any;

    get usuario() {
      return { ...this._usuario };
    }
    public url = 'assets/data/';

    constructor(private http:HttpClient, public snackBar: MatSnackBar) { }

    public getCategories(): Observable<Category[]>{

        return this.http.get<any[]>(this.url + 'categories.json');


    }
    postfiles(formData:any):Observable<any>
{
     const url=`${ this.baseUrl }/tools/fileupload.php`;
     return this.http.post<any>(url, formData);



}
///Dashboard CarteraVencida apis

public GetDivisionesCarteraChart(antiguedad:any,oficina:any,asesor:any,cliente:any):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/carteravencidaDashboard/getcarteravencidadivisiones.php?';
    const params=new HttpParams().set("id",antiguedad).set("oficina",oficina).set("asesor",asesor).set("cliente",cliente);
    return this.http.get<any[]>(apiurl,{params});

}
public GetCarteraAntiguedad(id:any,oficina:any,asesor:any,cliente:any):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/carteravencidaDashboard/getcarteraporantiguedad.php?';
    const params=new HttpParams().set("id",id).set("oficina",oficina).set("asesor",asesor).set("cliente",cliente);
    return this.http.get<any[]>(apiurl,{params});

}
public GetCarteraPorAsesor(id:any,division:any,oficina:any,cliente:any):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/carteravencidaDashboard/getcarteraporAsesor.php?';
    const params=new HttpParams().set("id",id).set("division",division).set("oficina",oficina).set("cliente",cliente);
    return this.http.get<any[]>(apiurl,{params});

}

public GetCarteraPorCliente(id:any,division:any,oficina:any,asesor:any):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/carteravencidaDashboard/getcarteravencidaporcliente.php?';
    const params=new HttpParams().set("id",id).set("division",division).set("oficina",oficina).set("asesor",asesor);

    return this.http.get<any[]>(apiurl,{params});

}

public GetCarteraPorOficina(id:any,division:any,asesor:any,cliente:any):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/carteravencidaDashboard/getcarteravencidaporoficina.php?';
    const params=new HttpParams().set("id",id).set("division",division).set("asesor",asesor).set("cliente",cliente);
    return this.http.get<any[]>(apiurl,{params});

}
public GetCarteraPorFactura(id:any,division:any,oficina:any,asesor:any,cliente:any):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/carteravencidaDashboard/getcarterafacturadashboard.php?';
    const params=new HttpParams().set("id",id).set("division",division).set("oficina",oficina).set("asesor",asesor).set("cliente",cliente);
    return this.http.get<any[]>(apiurl,{params});

}

///fin cartera vencidas apis

////apis bigData

///end apis bigData




    public GetClases():Observable<Clase[]>
    {
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/producto/GetClase.php?';
        return this.http.get<Clase[]>(apiurl);

    }
    public GetFamiliaByClass(Clase:string):Observable<Familia[]>
    {
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/producto/GetFamiliaByClass.php?';
        const params=new HttpParams().set("id",Clase);
        return this.http.get<Familia[]>(apiurl,{params});

    }
    public GetSubFamiliaByClassFam(FamiliaId:string):Observable<SubFamilia[]>
    {
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/producto/GetSubFamilaByClassFam.php?';
        const params=new HttpParams().set("id",FamiliaId);
        return this.http.get<SubFamilia[]>(apiurl,{params});

    }
    public GetClienteByClave(clave:any)
    {

        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/cliente/getclientebyclave.php?';

        const params=new HttpParams().set("id",clave);

        return this.http.get<SubFamilia[]>(apiurl,{params});

    }
    public GetEstadoClienteByEntidad(entidad:any)
    {
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/cliente/getestadoclientebyentidad.php?';

        const params=new HttpParams().set("id",entidad);

        return this.http.get<SubFamilia[]>(apiurl,{params});

    }
    //Cotizacion apartado  // como funciona la api addCotizacion
    AddCotizacion(cotizacion:any,detallecotizacion:any)
        {
        const url=`${ this.baseUrl }/ventas/addcotizacion.php`;


        const body={cotizacion,detallecotizacion}
        return this.http.post<any>( url, body );

        }
        //jaime
        AddVentaEmpleado(ventaEmpleado:any,detalles:any)
        {
        const url=`${ this.baseUrl }/ventas/addventaempleados.php`;
        const body={ventaEmpleado,detalles}
        return this.http.post<any>( url, body );
        }

        UPVentaEmpleadoDetalle(detalleid:any,ventaid:any,cantidad:any,NumeroFactura:any)
        {

          const url=`${ this.baseUrl }/ventas/actualizardetalleventa.php`;
          const body={detalleid,ventaid,cantidad,NumeroFactura}
          return this.http.post<any>( url, body );
        }

        UpdateConsolidado(consolidadoid:any,NumeroFactura:any,estatus:any)
        {
          const url=`${ this.baseUrl }/ventas/updateConsolidado.php`;
          const body={consolidadoid,NumeroFactura,estatus}
          return this.http.post<any>( url, body );

        }
        deletePartida(detalleid:any,ventaempleadoid:any,consolidadoid:any)
        {
          const url=`${ this.baseUrl }/ventas/deletedetallepartida.php`;
          const body={detalleid,ventaempleadoid,consolidadoid}
          return this.http.post<any>( url, body );

        }

        // termina ejemplo de addVentaEmpleado -- jaime

        //esto es para mandar sin los detalles solo la ventaEmpelado
        sinDetalles(ventaEmpleado,detalles:any){

          const url=`${ this.baseUrl }/ventas/addventaempleados.php`;
          const body={ventaEmpleado,detalles}
          return this.http.post<any>( url, body );

        }

        // elimina los detalles de cada venta individual

        EliminaDetalles(VentaDetalleId){

          const url=`${ this.baseUrl }/ventas/BorrarVentasDetalle.php`;
          const body={VentaDetalleId}
          return this.http.post<any>( url, body );

        }

        ActualizaTotal(EmpleadoId){

          const url=`${ this.baseUrl }/ventas/ActualizarTotal.php`;
          const body={EmpleadoId}
          return this.http.post<any>( url, body );
        }



        // ejemplo de api sendemailVentaEmpelado -- jaime

        sendemailVentaEmpleado(NumeroDeEmpleado:string,Fecha:Date,Total:number,detalles, Nombre:String,numVenta:number,correoDestino:string){

          const url=`${ this.baseUrl }/tools/sendmailVentaEmpleado.php`;
          const body={NumeroDeEmpleado,Fecha,Total,detalles,Nombre,numVenta,correoDestino}
          return this.http.post<any>( url, body );
        }

        enviarFacturas(ConsolidadoId,numFactura){

          const url=`${ this.baseUrl }/tools/enviarFactura.php`;
          const body={ConsolidadoId,numFactura}
          return this.http.post<any>( url, body );
        }

          // es para enviar los mensajes de quejas
          sendComments(name,email,phone,message){
            const url=`${ this.baseUrl }/tools/sendComments.php`;
            const body={name,email,phone,message}
            return this.http.post<any>( url, body );
          }


        //obtenerProductosPopulares

        getObtenerProductos(){
          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/productosPopulares.php`;
          return this.http.get<any>(url)
        }

        //obtener Categorias mas populares

        getObtenerCategoria(){
          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/productosPorCategoria.php`;
          return this.http.get<any>(url)

        }

        //obtener total de ventas por mes
        getObtenerTotalPorMes(){
          const url ='https://www.dikeninternational.com/dikenecommerce/api/ventas/ventasPorMes.php';
          return this.http.get<any>(url);
        }

        //es para actualizar el total de el mes

        actualizarTotalMes(idToUpdate){
          const url ='https://www.dikeninternational.com/dikenecommerce/api/ventas/actualizarTotalMes.php';
          const body={idToUpdate}
          return this.http.post<any>( url, body );
        }

        //es para devolver los detalles de cada venta

        getDetallesPorVentaEmpleado(detalleId){
          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/detallesDeCadaVenta.php?detalleId=${detalleId}`;
          return this.http.get<any>(url)
        }


        // es para agregar productosRelacionados a un producto


        insertarProductosRelacionados(ProductoPadreId,ProductoId){

          const url=`${ this.baseUrl }/ventas/insertarRelacionados.php`;
          const body={ProductoPadreId,ProductoId}
          return this.http.post<any>( url, body );
        }

        // es para agregar los productosSustitutos a un producto
        insertarProductosSustitutos(ProductoPadreId,ProductoId){

          const url=`${ this.baseUrl }/ventas/insertarSustitutos.php`;
          const body={ProductoPadreId,ProductoId}
          return this.http.post<any>( url, body );
        }

        // es para eliminar producto relacinado

        eliminarRelacionado(id){

          const url=`${ this.baseUrl }/ventas/eliminarRelacionados.php`;
          const body={id}
          return this.http.post<any>( url, body );
        }

        //obtengo los productosSustitutos para ver el id y asi eliminarlo

        verSustitutos(p_ProductoId: any): Observable<any> {
          let apiurl = 'https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerInfoSustitutos.php?';
          const params = new HttpParams().set('p_ProductoId', p_ProductoId);
          return this.http.get<any>(apiurl, { params });
        }

        eliminarSustitutos(id){
          const url=`${ this.baseUrl }/ventas/eliminarSustitutos.php`;
          const body={id}
          return this.http.post<any>( url, body );
        }

        verRelacionados(p_ProductoId: any): Observable<any> {
          let apiurl = 'https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerInfoRelacionados.php?';
          const params = new HttpParams().set('p_ProductoId', p_ProductoId);
          return this.http.get<any>(apiurl, { params });
        }



        // esto es para agregar un producto que se pueda fraccionar 01/09/2023

        agregarFraccionado(ProductoId,CantidadFraccion){

          const url=`${ this.baseUrl }/ventas/InsertarFraccionado.php`;
          const body={ProductoId,CantidadFraccion}
          return this.http.post<any>( url, body );

        }

        // es para eliminar el fraccionado

        eliminarFraccionado(FraccionId){
          const url=`${ this.baseUrl }/ventas/eliminarFraccionado.php`;
          const body={FraccionId}
          return this.http.post<any>( url, body );

        }


        // es para obtener los movimientos nulos
        getMovimientosNulos(){

          let apiurl = 'https://www.dikeninternational.com/dikenecommerce/api/ventas/getNuloMovimiento.php';
          return this.http.get<any>(apiurl);
        }








        public GetCotizacionesPorUsuarioId(usuarioId:any){

            let apiurl='https://www.dikeninternational.com/dikenecommerce/api/ventas/GetCotizacionByUsuarioId.php?';

        const params=new HttpParams().set("id",usuarioId);

        return this.http.get<any[]>(apiurl,{params});
        }
   ///fin cotizacion
    public getProducts(type): Observable<Product[]>{
        return this.http.get<Product[]>(this.url + type + '-products.json');
    }

    // Aqui colocare para devolver las ventasEmpleado

    // public GetVentasEmpleadoPorId(ventaEmpleadoId){

    //   let apiurl='https://www.dikeninternational.com/dikenecommerce/api/ventas/GetVentaEmpleado.php?';
    //   const params=new HttpParams().set("ventaEmpleadoId",ventaEmpleadoId);
    //   return this.http.get<any[]>(apiurl,{params});

    // }
    // Aqui se termina

    // este es el modificado par que solo trauga
    //todo  solo traiga por los RhID

    public GetVentasEmpleadoPorId(Id){

      let apiurl='https://www.dikeninternational.com/dikenecommerce/api/ventas/GetVentaEmpleado.php?';
      const params=new HttpParams().set("Id",Id);
      return this.http.get<any[]>(apiurl,{params});

    }

    public GetVentaColaboradoresPorId(id){


      let apiurl='https://www.dikeninternational.com/dikenecommerce/api/ventas/GetVentaColaboradores.php?';
      const params=new HttpParams().set("id",id);
      return this.http.get<any[]>(apiurl,{params});
    }
    //todo jaime
    // este sera el metodo de CancelarVentas del empleado


    // CancelarVenta(ventaId:number)
    //     {
    //     const url=`${ this.baseUrl }/ventas/cancelarVenta.php`;
    //     const params=new HttpParams().set("ventaId",ventaId);

    //     return this.http.post<any>( url, params );
    //     }

        CancelarVenta(ventaId:string) {
          const headers = new HttpHeaders().set('Content-Type', 'application/json');

          const url = `${this.baseUrl}/ventas/cancelarVenta.php`;
          const body = {ventaId};

          return this.http.post<any>(url, body , { headers });
        }


        // Aqui se termina el de cancelar venta

        // cerrar venta

        CerrarVenta(ventaId:number[]){

          const headers = new HttpHeaders().set('Content-Type', 'application/json');

          const url = `${this.baseUrl}/ventas/cerrarVenta.php`;
          const body = {ventaId};

          return this.http.post<any>(url, body , { headers });

        }

        // cambiarEstatusConsolidado
        cambiarEstatusConsolidado(ventaId){

          const headers = new HttpHeaders().set('Content-Type', 'application/json');
          const url = `${this.baseUrl}/ventas/cambiarEstatusConsolidado.php`;
          const body = {ventaId};

          return this.http.post<any>(url, body , { headers });
        }

        insertarFactura(numeroFactura,id){

          const headers = new HttpHeaders().set('Content-Type', 'application/json');
          const url = `${this.baseUrl}/ventas/actualizarFactura.php`;
          const body = {numeroFactura,id};

          return this.http.post<any>(url, body , { headers });

        }




        //todo esta es la llamada de searchApi

        getProductsApiEmpleado(type):Observable<Product[]>{
          let apiurl='https://www.dikeninternational.com/dikenecommerce/api/ventas/getProductsApiEmpleado.php?';
          const params=new HttpParams().set("TextSearch",type);
          return this.http.get<Product[]>(apiurl,{params}   );
        }

        // se inicia la llamada para productos solo movimientoNulo
        getProductsApiNuloMovimiento(type):Observable<Product[]>{
          let apiurl='https://www.dikeninternational.com/dikenecommerce/api/ventas/getProductsByNuloMovimiento.php?';
          const params=new HttpParams().set("TextSearch",type);
          return this.http.get<Product[]>(apiurl,{params}   );
        }



        //Aqui se termina la llamada de searchApi

        //todo aqui esta lo de cambiar contraseña

        cambiarContrasenia(formData:any){

          const url=`https://www.dikeninternational.com/dikenecommerce/api/ventas/recuperarContraseña.php`;
          const body={p_UsuarioId:formData.p_UsuarioId,p_Usuario:formData.p_Usuario,p_Password:formData.p_Password};
          return this.http.post<any>( url, body );

        }

        // Aqui ser lo que le das tu correo y te muestra el id

        verIdConCorreo(p_Correo: string) {
          const url = ` https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerIdConCorreo.php?p_Correo=${p_Correo}`;

          return this.http.get<any>(url);
        }


        // Aqui pondre el nuevo para poder cambiar el usuario y contra con el nueva api hecha el lunes 10 jul

        //colocare un get para obtener el UsuarioId con el token

        obtenerUsuarioIdConToken(token:string){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerIdToken.php?token=${token}`;
          return this.http.get<any>(url)
        }

        cambiarContraseniaNuevo(formData:any){

          const url=`https://www.dikeninternational.com/dikenecommerce/api/ventas/recuperarContraseñaNuevo.php`;
          const body={p_UsuarioId:formData.p_UsuarioId,p_Password:formData.p_Password};
          return this.http.post<any>( url, body );
        }

        updateFechaCad(id){ //es para actualizar la fecha de caducidad de contrasenia
          const url=`https://www.dikeninternational.com/dikenecommerce/api/ventas/updateCaducidadContra.php`;
          const body = {id}
          return this.http.put<any>(url,body)
        }






        // colocare para obtener admin de ventaEmpleados


        obtenerAdmin() {
          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerAdmin.php`; // Reemplaza con la URL de tu API

          return this.http.get<any[]>(url);
        }

        // es para obtener los perfiles que haran las compras por usuarios
        obtenerPerfil(id:any) {
          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerUsuarioNuevoPerfil.php?id=`+id; // Reemplaza con la URL de tu API

          return this.http.get<any[]>(url);
        }

        // colocare para obtener los consolidados y los muestre

        obtenerConsolidados(){
          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerConsolidados.php`;
          return this.http.get<any[]>(url);

        }

        // colocare para obtener la tabla junta de los consolidados

        obtenerTablaJunta(p_ConsolidadoId){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/obtenerTablaJunta.php?p_ConsolidadoId=${p_ConsolidadoId}`
          return this.http.get<any>(url)

        }
        getdataconsolidadobyid(p_ConsolidadoId){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/getdataconsolidadobyid.php?p_ConsolidadoId=${p_ConsolidadoId}`
          return this.http.get<any>(url)

        }
        getordenVentaPorConoslidadoId(p_ConsolidadoId){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/NS/getordenVentaPorConoslidadoId.php?p_ConsolidadoId=${p_ConsolidadoId}`
          return this.http.get<any>(url)

        }
        getFacturaByOV(p_ConsolidadoId){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/NS/getqueryResultNs.php?p_ConsolidadoId=${p_ConsolidadoId}`
          return this.http.get<any>(url)

        }
        GenerarOrdenDeventa(data:any){

          const headers = new HttpHeaders().set('Content-Type', 'application/json');
          const url = `${this.baseUrl}/NS/addordersale.php`;
          //const body = {data};

          return this.http.post<any>(url, data , { headers });
        }

        // obtener todos los datos de un usuario , 02/08/2023

        obtenerTodosDatos(p_UsuarioId){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/ObtenerDatosUsuario.php?p_UsuarioId=${p_UsuarioId}`
          return this.http.get<any>(url)
        }


      obtenerCategoriasProducto(){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/getCategoriasEmpleados.php`;
          return this.http.get<any[]>(url);

        }

        obtenerSubMenuEquipos(){

          const url = `https://www.dikeninternational.com/dikenecommerce/api/ventas/getSubMenu.php`;
          return this.http.get<any[]>(url);

        }




    public getProductsApi(type): Observable<Product[]>{
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/producto/getproducttextsearch.php?';
        const params=new HttpParams().set("id",type);
        return this.http.get<Product[]>(apiurl,{params}   );
    }
    public getProductsApiRelacionados(type): Observable<Product[]>{
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/producto/GetProductosRelacionados.php?';
        const params=new HttpParams().set("id",type);
        return this.http.get<Product[]>(apiurl,{params}   );
    }
    public getProductsApiSustitutos(type): Observable<Product[]>{
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/producto/GetProductosSustitutos.php?';
        const params=new HttpParams().set("id",type);
        return this.http.get<Product[]>(apiurl,{params}   );
    }
    public getProductsByIdApi(id): Observable<any>{
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/producto/getproductbyid.php?';
        const params=new HttpParams().set("id",id);
        return this.http.get<Product>(apiurl,{params}   );
    }
 public getperiodosventa( ): Observable<any>{
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/usuario/getperiodosventa.php';

        return this.http.get<Product>(apiurl );
    }

    UpdateProducto(ProductoId:any,Producto:any,PrecioActual:any,Descripcion:any,Clase:any,Familia:any,SubFamilia:any,TextSearch:any,CodigoDiken:any,PrettyText:any,ParaVentaEmpleado:any,SePuedeFraccionar:any,CantidadFraccionar:any,NuloMovimiento:any)
    {
      const url=`${ this.baseUrl }/producto/UpdateProducto.php`;


      const body={ProductoId,Producto,PrecioActual,Descripcion,Clase,Familia,SubFamilia,TextSearch,CodigoDiken,PrettyText,ParaVentaEmpleado,SePuedeFraccionar,CantidadFraccionar,NuloMovimiento}
      return this.http.put<any>( url, body );

    }
    UpdateProductoImagen(Id:any,ProductoId:any,small:any,medium:any,big:any,EsPrincipal:any)
    {
      const url=`${ this.baseUrl }/producto/UpdateProductoImagen.php`;

      const body={Id,ProductoId,small,medium,big,EsPrincipal}
      return this.http.put<any>( url, body );

    }


    public getProductById(id): Observable<Product>{
        return this.http.get<Product>(this.url + 'product-' + id + '.json');
    }

    public getBanners(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'banners.json');
    }

    public addToCompare(product:Product){
        let message, status;
        if(this.Data.compareList.filter(item=>item.id == product.id)[0]){
            message = 'El producto ' + product.name + ' ya está en la lista de comparación.';
            status = 'error';
        }
        else{
            this.Data.compareList.push(product);
            message = 'El producto ' + product.name + ' Se agrego a la lista de comparacion.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public addToWishList(product:Product){
        let message, status;
        if(this.Data.wishList.filter(item=>item.id == product.id)[0]){
            message = 'El producto ' + product.name + ' ya está agregado a la lista.';
            status = 'error';
        }
        else{
            this.Data.wishList.push(product);
            message = 'El producto ' + product.name + ' se ha agregado a la lista.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public addToCart(product:Product){

        let message, status;
        this.Data.CodigoDiken=product.CodigoDiken;
        this.Data.totalPrice = null;
        this.Data.totalCartCount = null;


        if(this.Data.cartList.filter(item=>item.id == product.id)[0]){
            let item = this.Data.cartList.filter(item=>item.id == product.id)[0];
            item.cartCount = product.cartCount;
        }
        else{
            this.Data.cartList.push(product);
        }

        this.Data.cartList.forEach(product=>{


            this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
            this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;

        });

        message = 'El producto ' + product.name + ' se ha agregado al carrito.';
        status = 'success';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public resetProductCartCount(product:Product){
        product.cartCount = 0;
        let compareProduct = this.Data.compareList.filter(item=>item.id == product.id)[0];
        if(compareProduct){
            compareProduct.cartCount = 0;
        };
        let wishProduct = this.Data.wishList.filter(item=>item.id == product.id)[0];
        if(wishProduct){
            wishProduct.cartCount = 0;
        };
    }

    public getBrands(){
        return [
            { name: 'aloha', image: 'assets/images/brands/aloha.png' },
            { name: 'dream', image: 'assets/images/brands/dream.png' },
            { name: 'congrats', image: 'assets/images/brands/congrats.png' },
            { name: 'best', image: 'assets/images/brands/best.png' },
            { name: 'original', image: 'assets/images/brands/original.png' },
            { name: 'retro', image: 'assets/images/brands/retro.png' },
            { name: 'king', image: 'assets/images/brands/king.png' },
            { name: 'love', image: 'assets/images/brands/love.png' },
            { name: 'the', image: 'assets/images/brands/the.png' },
            { name: 'easter', image: 'assets/images/brands/easter.png' },
            { name: 'with', image: 'assets/images/brands/with.png' },
            { name: 'special', image: 'assets/images/brands/special.png' },
            { name: 'bravo', image: 'assets/images/brands/bravo.png' }
        ];
    }

    public getCountries(){
        return [
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Aland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'AndorrA', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'S Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'RWANDA', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Viet Nam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
        ]
    }

    public getMonths(){
        return [
            { value: '01', name: 'January' },
            { value: '02', name: 'February' },
            { value: '03', name: 'March' },
            { value: '04', name: 'April' },
            { value: '05', name: 'May' },
            { value: '06', name: 'June' },
            { value: '07', name: 'July' },
            { value: '08', name: 'August' },
            { value: '09', name: 'September' },
            { value: '10', name: 'October' },
            { value: '11', name: 'November' },
            { value: '12', name: 'December' }
        ]
    }

    public getYears(){
        return ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030" ]
    }

    public getDeliveryMethods(){
        return [
            { value: 'free', name: 'Free Delivery', desc: '$0.00 / Delivery in 7 to 14 business Days' },
            { value: 'standard', name: 'Standard Delivery', desc: '$7.99 / Delivery in 5 to 7 business Days' },
            { value: 'express', name: 'Express Delivery', desc: '$29.99 / Delivery in 1 business Days' }
        ]
    }

// aqui empiezo a editar (jaime)

    // public agregarVentaEmpleado(ventaEmpleado: any) {
    //   const url = 'https://www.dikeninternational.com/dikenecommerce/api/ventas/addventaEmpleado.php?'; // Reemplaza con la URL de tu API

    //   this.http.post(url, ventaEmpleado).subscribe(
    //     (response: any) => {
    //       // La venta se agregó correctamente
    //       console.log(response.message);
    //     },
    //     (error: any) => {
    //       // Error al agregar la venta
    //       console.error(error.message);
    //     }
    //   );
    // }











}
