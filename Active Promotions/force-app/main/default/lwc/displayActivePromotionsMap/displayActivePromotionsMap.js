import { LightningElement, wire, track, api } from 'lwc';
import getOfficeLocations from '@salesforce/apex/displayActivePromotionsMap.getOfficeLocations';
export default class DisplayActivePromotionsMap extends LightningElement {
    @track error;   //this holds errors
    @track mapMarkers = [];
    @track markersTitle = 'Active Promotions';
    @track zoomLevel = 4;
    @track listView = 'visible';
    @track Marker_color = ' ';
    @track accountType = ' ';
    @track selected;
    @track str = ' ';
    /* Load address information based of Active Promotions from Controller */
    handleChange(event)
    {   
    //Active Promotions for all Account Types
        this.mapMarkers = [];
        this.selected = event.target.checked;
     switch (this.selected) {
         case true:
            this.accountType = ' ';
             break;
         case false://Customer-Direct only
            this.accountType = 'Customer - Direct';
            break;   
                             }
 
    }
    //Passing Account Type as parameter to the controller
    @wire(getOfficeLocations, {accountType: '$accountType'})
    wiredOfficeLocations({ error, data }) {
        if (data) {            
            data.forEach(dataItem => {
                /*
                if (dataItem.Type__c === 'Customer - Direct') {
                    this.Marker_color = 'blue';
                    
                }else{
                    this.Marker_color = 'red';
                }*/
    //Change the color Map marker based on Account Type
                switch (dataItem.Type__c) {

                    case 'Prospect':
                        this.Marker_color = 'green';
                        break;
                    case 'Customer - Direct':
                        this.Marker_color = 'blue';
                        break;
                    case 'Customer - Channel':
                        this.Marker_color = 'pink';
                        break;
                    case 'Channel Partner / Reseller':
                        this.Marker_color = 'yellow';
                        break;
                    case 'Installation Partner':
                        this.Marker_color = 'orange';
                        break;
                    case 'Technology Partner': 
                        this.Marker_color = 'violet';
                        break;
                    case 'Other': 
                        this.Marker_color = 'red';
                         break;    

                    default:
                        break;
                }
    //Insert line breaks and text as bold and Italic
                this.str = '';
                this.str = '<i>'+dataItem.Description__c+'</i>';
                this.str += '<br>'+'<br>'+'<b>'+dataItem.Account__r.BillingCity;
                this.str += ' '+dataItem.Account__r.BillingPostalCode;
                this.str += ' '+dataItem.Account__r.BillingCountry+'</b>';
    //Update Map markers            
                this.mapMarkers = [...this.mapMarkers ,
                    {
                        location: {
                            City: dataItem.Account__r.BillingCity,
                            Country: dataItem.Account__r.BillingCountry,
                            Latitude:dataItem.Account__r.Latitude,
                            Longitude:dataItem.Account__r.Longitude,
                        },
    //Set the attributes for Map marker color,size etc    
                        //icon: 'custom:custom26',
                        mapIcon : { 
                            path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
                             fillColor: this.Marker_color, 
                             fillOpacity: 0.6,
                            strokeWeight: 0,
                            rotation: 0,
                            scale: 2,
                            anchor: {x: 15, y: 30},
                        },
    //Set the tile and description for Map marker
                        title: dataItem.Name,
                        //description:dataItem.Description__c,
                        description:this.str,
                    }                                    
                ];
               
              });            
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }  
    }

}