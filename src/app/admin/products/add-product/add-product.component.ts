import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Category, Clase, Familia, ProductoImagen, SubFamilia } from 'src/app/app.models';
import 'quill-mention';
import 'quill-emoji';
import { ThemePalette } from '@angular/material/core';
import { MaService } from 'src/app/admin-mesadeayuda/ma.service';
import { ProductserviceService } from '../productservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string=  ".png,.jpg,.jepg";
  fileControl!: FormControl;

   sePuedeFraccionar:boolean = false;



  htmlText = '';
  htmlTextCaracteristica="";
  hasFocus = false;
  subject: string;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' },
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' },
  ];

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'], // remove formatting button

        ['link'],
        //['link', 'image', 'video']
      ],
    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm, renderList, mentionChar) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter: {
          key: 13,
          handler: (range, context) => {
            console.log('enter');
            return true;
          },
        },
      },
    },
  };


  ////richtext end
  public form: UntypedFormGroup;
  public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#696969"];
  public sizes = ["S","M","L","XL","2XL","32", "36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""];
  public selectedColors:string;
  public categories:Category[];
  private sub: any;
  public id:any;
  public dataClase:Clase[];
  public dataFamilia:Familia[];
  public dataSubFamilia:SubFamilia[];
  cantidadFraccionar: any;
  FraccionIsActive: any;
  NuloMovimiento: any;

  // nuloMovimiento =false;

  constructor(public snackBar: MatSnackBar,public appService:AppService,public prodservice: ProductserviceService, public formBuilder: UntypedFormBuilder, private activatedRoute: ActivatedRoute,private router:Router ) { }


  Vertexto() {
    alert(this.htmlText);
  }

  test = (event) => {
    console.log(event.keyCode);
  };

  onSelectionChanged = (event) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  onContentChanged = (event) => {
    //console.log(event.html);
  };

  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };

  ngOnInit(): void {



    this.form = this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'images': [null,Validators.required],
      'imagesM': [null,Validators.required],
      'imagesB': [null,Validators.required],
      'TextSearch':null,
      "newPrice": [null, Validators.required ],
      "ClaseId":['',Validators.required],
      "FamiliaId":['',Validators.required],
      "SubFamiliaId":['',Validators.required],
      "CodigoDiken":['',Validators.required],
      "ParaVentaEmpleado":null,
      "availibilityCount": null,
      "SePuedeFraccionar":false,
      "CantidadFraccionar":0,
       "NuloMovimiento":0

    });
    this.form.get('SePuedeFraccionar').valueChanges.subscribe(value => {
      this.sePuedeFraccionar = value;
    });
    this.form.get('CantidadFraccionar').valueChanges.subscribe(value => {
      this.cantidadFraccionar = value;
    });

    this.form.get('NuloMovimiento').valueChanges.subscribe(value => {
      this.NuloMovimiento = value ? 1 : 0 ;
    });






    this.appService.GetClases().subscribe((res:any)=>{
      this.dataClase=res;

    })


    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {
      if(params['id']){
        this.id = params['id'];
        this.getProductById(); // esto trae cada dato de el producto
        // console.log(this.id)
      }
    });
  }

  changeClase(id:string)
  {

    this.appService.GetFamiliaByClass(id).subscribe((res:any)=>{

      this.dataFamilia=res;

    });



  }
  changeFamilia(id:string)
  {

    this.appService.GetSubFamiliaByClassFam(id).subscribe((res:any)=>{

      this.dataSubFamilia=res;

    });


  }
  public getCategories(){
    this.appService.getCategories().subscribe(data => {
      this.categories = data;
      this.categories.shift();
    });
  }

  public getProductById(){
    this.appService.getProductsByIdApi(this.id).subscribe((data:any)=>
    {
      this.appService.GetFamiliaByClass(data.ClaseId).subscribe((res:any)=>{

        this.dataFamilia=res;

      });
      this.appService.GetSubFamiliaByClassFam(data.FamiliaId).subscribe((res:any)=>{

        this.dataSubFamilia=res;

      });
      this.htmlText=data.description;

      this.FraccionIsActive = data.SePuedeFraccionar;
      this.cantidadFraccionar=data.CantidadFracionar;
      this.htmlTextCaracteristica=data.PrettyText;

      // this.nuloMovimiento = data.NuloMovimiento;

      // console.log(this.nuloMovimiento);

       // Convierte true a 1 y false a 0



      this.form.patchValue(data);
      this.selectedColors = data.color;

      const images: any[] = [];
      data.images.forEach(item=>{
        let image = {
          link: item.small,
          preview: item.small
        }
        images.push(image);
      })

      this.form.controls.images.setValue(images);
      const images2: any[] = [];
      data.images.forEach(item=>{
        let image2 = {
          link: item.medium,
          preview: item.medium
        }
        images2.push(image2);
      })
      this.form.controls.imagesM.setValue(images2);

      const images3: any[] = [];
      data.images.forEach(item=>{
        let image = {
          link: item.big,
          preview: item.big
        }
        images3.push(image);
      })
      this.form.controls.imagesB.setValue(images3);
    });
  }

  public onSubmit(){

    // Convierte NuloMovimiento en 1 o 0 según si es true o false
    const formData = new FormData();


    const formDataM = new FormData();

    const formDataB = new FormData();
    const {name,newPrice,TextSearch,ClaseId,FamiliaId,SubFamiliaId, images,imagesM,imagesB,CodigoDiken,ParaVentaEmpleado,SePuedeFraccionar,CantidadFraccionar,NuloMovimiento } = this.form.value;
    const NuloMovimientoValue = NuloMovimiento ? 1 : 0;

if (this.form.invalid)
{
  this.snackBar.open("Las imagenes son requeridas", '×', { panelClass: "error", verticalPosition: 'top', duration: 3000 })
  return;
}


// return;
if (this.id!=undefined){

  this.prodservice.GetFamiliasDescription(SubFamiliaId).subscribe((famdes:any)=>{

    // console.log(famdes);
    // this.paginaProductos();
    this.appService.UpdateProducto(this.id,name,newPrice,this.htmlText,famdes.Clase,famdes.Familia,famdes.SubFamilia,TextSearch,CodigoDiken,this.htmlTextCaracteristica,ParaVentaEmpleado,SePuedeFraccionar,CantidadFraccionar,NuloMovimientoValue).subscribe();
    //todo ir a inicio


  });

  this.prodservice.GetProductoImangeByProductoId(this.id).subscribe((res:ProductoImagen)=>{

    if(res!=undefined)
    {
      let small:string,medium:string,big:string;
      if(images[0].hasOwnProperty('file'))
      {
        small=images[0].file.name;
        formData.append('file', images[0].file);
        formData.append('tmp_name', images[0].file.name);
        this.prodservice.postfiles(formData).subscribe((datosx:any) => {

                });


          }
          else
          {small=res.small}

          if(imagesM[0].hasOwnProperty('file'))
          {
            medium=imagesM[0].file.name;
            formDataM.append('file', imagesM[0].file);
            formDataM.append('tmp_name', imagesM[0].file.name);
                 this.prodservice.postfiles(formDataM).subscribe((datosx:any) => {

                });

              }
              else
              {medium=res.medium}

          if(imagesB[0].hasOwnProperty('file'))
          {
            big=imagesB[0].file.name;
            formDataB.append('file', imagesB[0].file);
            formDataB.append('tmp_name', imagesB[0].file.name);
            this.prodservice.postfiles(formDataB).subscribe((datosx:any) => {

                });

              }
              else
              {big=res.big}

              this.appService.UpdateProductoImagen(res.Id,this.id,small,medium,big,res.EsPrincipal).subscribe();



            }
            else
            {
          let small:string,medium:string,big:string;

          if(images[0].hasOwnProperty('file'))
          {
            small=images[0].file.name;
            formData.append('file', images[0].file);
                 formData.append('tmp_name', images[0].file.name);
                 this.prodservice.postfiles(formData).subscribe((datosx:any) => {

                });


          }
          else
          {small=undefined}
          if(imagesM[0].hasOwnProperty('file'))
          {
            medium=imagesM[0].file.name;
            formDataM.append('file', imagesM[0].file);
            formDataM.append('tmp_name', imagesM[0].file.name);
                 this.prodservice.postfiles(formDataM).subscribe((datosx:any) => {

                });

          }
          else
          {medium=undefined}

          if(imagesB[0].hasOwnProperty('file'))
          {
            big=imagesB[0].file.name;
            formDataB.append('file', imagesB[0].file);
            formDataB.append('tmp_name', imagesB[0].file.name);
                 this.prodservice.postfiles(formDataB).subscribe((datosx:any) => {

                });

          }
          else
          {big=undefined}

          this.prodservice.AddProductoImagen(this.id,small,medium,big,1).subscribe();

        }


        this.paginaProductos(); //todo con esto ya me voy al inicio de productos

        //colocar algo para saber que este esta en activo para fraccionado





      })

      return;



     }






// this.appService.postfiles(formData).subscribe((datosx:any) => {

// });


  }

  public onColorSelectionChange(event:any){
    if(event.value){
      this.selectedColors = event.value.join();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


    paginaProductos(){
      this.router.navigate(['/admin/products/product-list']); // esto es para que me redireccione a ventas cuando inicio sesion
    }


    agregarFraccionado(){
      // es para que un producto se coloque en fraccionado

      // this.id = params['id'];


      const Datosfraccionado = {
        ProductoId:this.id,
        CantidadFraccion: this.cantidadFraccionar
      }


      this.appService.agregarFraccionado(Datosfraccionado.ProductoId,Datosfraccionado.CantidadFraccion).subscribe((res)=>{
        // console.log(res);
      })

    }


  eliminarFraccionado(){
    const DatosFraccionado = {
      FraccionId:this.id
    }

    this.appService.eliminarFraccionado(DatosFraccionado.FraccionId).subscribe((res)=>{
      // console.log(res)
    })

  }



}
