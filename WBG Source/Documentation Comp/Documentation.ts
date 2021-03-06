import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';

 

import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

 

import { ModalDirective } from 'ngx-bootstrap/modal';

 

import { filter, pullAt, clone, keys, flatMap, pullAll, includes, map, pull, forEach, last } from 'lodash';

 

import { WebapiService } from '../../../services/webapi.service';

 

import { constants } from '../../../constants/constants'

 

import "rxjs/add/operator/takeUntil";

 

import { Subject } from "rxjs/Subject";

 

 

 

declare var $: any;

 

 

 

@Component({

 

  selector: 'app-documentation',

 

  templateUrl: './documentation.component.html'

 

  

 

})

 

export class DocumentationComponent implements OnInit {

 

 

 

    @Output() docForm = new EventEmitter<FormGroup>();

 

    @Output() save_value = new EventEmitter();

 

  @Input() ModuleName: any;

 

  @Input() inDocArray: FormArray;

 

  dockGrp: FormGroup;

 

  addEditDock: FormGroup;

 

  allDocksLnth: number;

 

  tdockIndex: number;

 

  tdockMode: string = ''; 

 

  newctrl: any;

 

  delCtrl: any;

 

  isDisabled: boolean = true;  

 

  strId: string = '';

 

  dockCategories: any;

 

  private unsubscribe: Subject<any> = new Subject();

 

  validationAlert: boolean = false;

 

  validateDocuments: boolean = false;

 

  dockTitleAry: any;

 

  uniqDockTitle: boolean=true;

 

  delAry: any = [];

 

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

 

  isModalShown: boolean = false;

 

  isModalEdtShown: boolean = false;

 

  dockNameForUrl: any = [];

 

 

 

  constructor(private fb: FormBuilder, private service: WebapiService) { }

 

 

 

  ngOnInit() {

 

      this.dockGrp = this.fb.group({

 

          documents: this.fb.array(this.inDocArray.value ? this.inDocArray.value : []),

 

          documentsToDel: '',

 

          modifiedDocks: this.fb.array([])

 

      });

 

 

 

      this.addEditDock = this.fb.group({

 

          ProjectDetailID: this.ModuleName[0],

 

          //IndicatorProfileID: '',

 

          //ProjectDeliverableID: '',

 

          DocumentID: '',

 

          DocumentTitle: ['', Validators.required],

 

          DocumentCategory: ['', Validators.required],

 

          DocumentCategoryName: '',

 

          DocumentClassification: '',

 

          DocumentClassificationName: '',

 

          //DocumentDate: '',

 

          //SignedDate: '',

 

          //EndDate: '',

 

          UploadFileURL: '',

 

          FileBlob:'',

 

          UploadFile:''

 

      })

 

      //this.dockTitleAry = map(this.inDocArray.value, 'DocumentTitle');

 

      this.fnFrameDockNameForUrl(this.inDocArray.value);

 

      

 

      this.onChanges();

 

      this.getDockCategory();

 

  }

 

 

 

  addDocktoArray() {

 

      if (this.addEditDock.valid && (!this.isEmpty(this.addEditDock.get('UploadFile').value) || !this.isEmpty(this.addEditDock.get('UploadFileURL').value)) && this.uniqDockTitle) {

 

          this.validationAlert = false;

 

          this.newctrl = <FormArray>this.dockGrp.get('documents')

 

          if (this.tdockMode == 'New') {

 

              this.newctrl.insert(0, this.buildDocItem(this.addEditDock.value, 'Add'));

 

          }

 

          else if (this.tdockMode == 'Edit') {

 

              this.newctrl.removeAt(this.tdockIndex);

 

              this.newctrl.insert(this.tdockIndex, this.buildDocItem(this.addEditDock.value, 'Add'));

 

              // To Save in Documentation Dialog box save

 

              this.save_value.emit(this.addEditDock);

 

          }

 

          //this.dockTitleAry = map(this.dockGrp.get('documents').value, 'DocumentTitle');

 

          this.fnFrameDockNameForUrl(this.dockGrp.get('documents').value);

 

          this.addEditDock.reset();

 

          //console.log(this.dockGrp);

 

          this.docForm.emit(this.dockGrp);

 

          this.hideModal();

 

      }

 

      else {

 

          this.validateDocuments = false;

 

          this.validateAllFormFields(this.addEditDock);

 

          this.validationAlert = true;          

 

      }

 

  }

 

 

 

  buildDocItem(Obj: any, pMode: string) {      

 

      if (Obj) {

 

          if (pMode == 'Edit')

 

          {

 

              Obj = Obj[0];

 

              for (let key of keys(Obj)) {

 

                  this.addEditDock.contains(key) ? this.addEditDock.get(key).setValue(Obj[key]) : null;

 

              }              

 

              pull(this.dockTitleAry, this.addEditDock.get('DocumentTitle').value);     

 

           

 

          }

 

          //below condition will  generate dynamic form group and return will append to dockGrp documents

 

          else if (pMode == 'Add') {

 

              const group = this.fb.group({});

 

              keys(Obj).forEach(key => {

 

                  let control: FormControl = new FormControl(Obj[key]);

 

                  group.addControl(key, control);

 

              });

 

              this.newctrl = <FormArray>this.dockGrp.get('modifiedDocks')

 

              this.newctrl.push(group);

 

              return group;

 

          }

 

      }

 

  }

 

 

 

  removeDock(index: number) {

 

      this.newctrl = <FormArray>this.dockGrp.get('documents');

 

      let tdockID = this.newctrl.at(index).value['DocumentID'];      

 

      if (!this.isEmpty( tdockID)) {          

 

          this.delAry.push({ "GUID": tdockID, "Entityname": "cgap_document" });

 

          this.dockGrp.get('documentsToDel').setValue(this.delAry);

 

      }

 

      //console.log(this.dockGrp.get('documentsToDel').value);

 

    this.newctrl.removeAt(index);

 

    //this.dockTitleAry = map(this.dockGrp.get('documents').value, 'DocumentTitle');

 

    this.fnFrameDockNameForUrl(this.dockGrp.get('documents').value);

 

    this.docForm.emit(this.dockGrp);

 

  }

 

 

 

  getControls(Form) {

 

    return  Form.value;

 

  }

 

 

 

  getDockCategory() {

 

      this.service.ApiController(null, constants.DocumentCategoryOptionSet, constants.GetMethod, constants.ControllerAPI).takeUntil(this.unsubscribe).subscribe((data) => {

 

          this.dockCategories = flatMap(data.Options, (n) => [{

 

              name: n.Label.UserLocalizedLabel.Label, value: n.Value

 

          }]);          

 

      });

 

  }

 

 

 

  setSelectedName(pCtrl, pVal) {       

 

      this.addEditDock.get(pCtrl).setValue(pVal);

 

  }

 

 

 

  fnFrameDockNameForUrl(pAry) {

 

      this.dockTitleAry = map(pAry, 'DocumentTitle');

 

      this.dockNameForUrl = map(pAry, 'UploadFileURL');

 

      this.dockNameForUrl=map(this.dockNameForUrl, (v) =>{

 

          if (includes(v, 'Project Documents'))

 

              return last(v.split("/"));

 

          else

 

              return v;

 

      });

 

  }

 

 

 

  onChanges(): void {      

 

      this.addEditDock.get('DocumentTitle').statusChanges.subscribe(val => {         

 

          if (val == 'VALID') {              

 

              if (!includes(this.dockTitleAry, this.addEditDock.get('DocumentTitle').value)) {

 

                  this.isDisabled = false;this.uniqDockTitle = true;}   

 

              else if (includes(this.dockTitleAry, this.addEditDock.get('DocumentTitle').value) && this.addEditDock.get('DocumentTitle').dirty) {

 

                  this.isDisabled = true;this.uniqDockTitle = false;}  

 

          }

 

          else {

 

              this.isDisabled = true;this.uniqDockTitle = true;}              

 

    });

 

  }

 

 

 

  showModal(dockId, pMode, pIndex) {      

 

      this.tdockIndex = pIndex; this.tdockMode = pMode;      

 

      if (dockId == '' && pMode == 'New') {

 

          this.addEditDock.reset();          

 

          this.addEditDock.get('DocumentCategory').setValue('');

 

          this.addEditDock.get('ProjectDetailID').setValue(this.ModuleName[0]);

 

          this.isModalShown = true;

 

      }

 

      //below two conditions will be used to display edit screen data

 

      else if (dockId && pMode == 'Edit') {

 

          this.buildDocItem(filter(this.dockGrp.get('documents').value, { 'DocumentID': dockId }), 'Edit');          

 

          this.addEditDock.get('DocumentTitle').value != '' ? this.isDisabled = false : this.isDisabled = true;          

 

          this.isModalShown = true; 

 

      }

 

      else if (!dockId && pMode == 'Edit') {          

 

          this.buildDocItem(pullAt(clone(this.dockGrp.get('documents').value), pIndex), 'Edit');

 

         this.addEditDock.get('DocumentTitle').value != '' ? this.isDisabled = false : this.isDisabled = true;

 

          this.isModalShown = true;

 

      }

 

           

 

  }  

 

 

 

  hideModal(): void {

 

      this.autoShownModal.hide();

 

      this.validationAlert = false;

 

      this.validateDocuments = false;

 

  }

 

 

 

  onHidden(): void {

 

      this.isModalShown = false;     

 

  }

 

 

 

  isEmpty(value) {

 

      return (value == null || value == undefined || value == '' || Object.keys(value).length == 0 || value == "failed");

 

  }

 

 

 

  validateAllFormFields(formGroup: FormGroup) {

 

      let invalidAry: string[] = Object.keys(formGroup.controls).filter((control: any) => {

 

          control = <FormControl>control;

 

          return formGroup.controls[control]["invalid"] && formGroup.controls[control]["errors"];

 

      });

 

      let validAry: string[] = pullAll(Object.keys(formGroup.controls), invalidAry);

 

      if (this.isEmpty(formGroup.get('UploadFile').value) && this.isEmpty(formGroup.get('UploadFileURL').value)) {

 

          $("[formcontrolname=UploadFile]").closest('.col-md-7').css("border", "#d9534f solid 1px");

 

          this.validateDocuments = true;

 

      }

 

     else

 

          $("[formcontrolname=UploadFile]").closest('.col-md-7').removeAttr("style");

 

      for (let val of invalidAry) {

 

          $("[formcontrolname=" + val + "]").parent("div.form-group,div.select-wrapper").addClass("has-danger");

 

      }

 

      for (let val of validAry) {

 

          if ($("[formcontrolname=" + val + "]").parent("div.form-group,div.select-wrapper").hasClass("has-danger"))

 

              $("[formcontrolname=" + val + "]").parent("div.form-group,div.select-wrapper").removeClass("has-danger");

 

      }

 

  }

 

 

 

    FileChange(event) {

 

       // console.log(event.files[0]);

 

        let fileExt = event.files[0].name.split('.').pop();

 

        let updatedFilename = this.ModuleName[1] + "_" + this.addEditDock.controls["DocumentTitle"].value + '.' + fileExt;

 

        this.addEditDock.controls["FileBlob"].setValue(event.files[0]);

 

        this.addEditDock.controls["UploadFileURL"].setValue(updatedFilename);

 

    }

}