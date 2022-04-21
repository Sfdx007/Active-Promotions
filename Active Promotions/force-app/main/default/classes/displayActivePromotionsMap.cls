public with sharing class displayActivePromotionsMap {
        @AuraEnabled(cacheable=true)
    public static List<Promotion__c> getOfficeLocations(String accountType){
    //Fetch Active Promotions for all Accountypes    
        if (accountType==' ') {
            return [ SELECT Account__c,Active__c,Description__c,Name,Type__c,Account__r.Id,Account__r.Name,
        Account__r.BillingStreet,Account__r.BillingCity,Account__r.BillingState,Account__r.BillingPostalCode,Account__r.BillingCountry
        FROM Promotion__c WHERE Active__c = true   
        ];  
        }
    //Fetch Active Promotions of Account type Customer_Direct only
        else{
            return [ SELECT Account__c,Active__c,Description__c,Name,Type__c,Account__r.Id,Account__r.Name,
        Account__r.BillingStreet,Account__r.BillingCity,Account__r.BillingState,Account__r.BillingPostalCode,Account__r.BillingCountry
        FROM Promotion__c WHERE Active__c = true  AND Type__c = :accountType 
        ];  
        }
             
    }
    
}