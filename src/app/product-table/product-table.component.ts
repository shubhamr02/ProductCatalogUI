import { Component } from '@angular/core';
import { ProductDTO } from 'src/models/product.model';
import { ProductService } from 'src/service/product.service';
import { ModalDismissReasons,  NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html'
})
export class ProductTableComponent {

  public products : any = []
  closeResult : string = '';

  constructor(public service : ProductService,private modalService : NgbModal,private fb:FormBuilder){}

  ngOnInit(){
      this.getProducts();
      //this.SetValues();
  }
  open(content: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : false,
      keyboard : true
    };
		this.modalService.open(content,ngbModalOptions)
	}

  productForm = this.fb.group({
    product_name : [''],
    product_type : [''],
    product_category : [''],
    product_price : [''],
  })

  SetValues(){
    this.productForm.patchValue({
      product_name : 'abc',
      product_type : 'abc',
      product_category : 'abc',
      product_price : '2200',
    })
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  getProducts(){
    let url:string = 'http://localhost:8888/api/products'
      return this.service.getAllProducts(url)
      .subscribe(data => {
        this.products = data
      })
      
  }

  submit(){
    console.log(typeof(this.productForm.value))

    return this.service.addProductToCatalog(this.productForm.value)
    .subscribe((data) => {
      console.log(data)
      this.getProducts()  //Loads the product after saving..
    })
    
  }

  updateProduct(){
    alert('Plz wait under progress....')
  }

 

}
