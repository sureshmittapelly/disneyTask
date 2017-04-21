'use strict';
(function (){
    angular.module('disney_webapp', ['ui.router']);
}());


/**
 * Class to hold Constants.
 */

(function() {
    'use strict';
    var Constants = function() {
        var context = {

        };
        var templateURLs = {
            landing             : 'landing.html',
            contactInfo    		: 'contactInformation.html',
			checkboxPage		: 'checkboxPage.html'
        };
        var state = {
            landing             : 'landing',
            contactInfo     	: 'contactInfo',
			checkboxPage		: 'checkboxPage'
        };
        return {
            context             : context,
            templateURLs        : templateURLs,
            state               : state,
			getTemplateURL		: getTemplateURL
        };

        function getTemplateURL(templateName){
            var isDynamic = true;
            var templateURL = templateName;
            if(isDynamic){
                templateURL = templateName+'?t='+Math.random();
            }
            return templateURL;
        }
    };
    var constansObj = new Constants();
    angular.module('disney_webapp').constant('constants',constansObj);
}());


/**
 * Controller for Enrollement Page.
 */
(function () {
    'use strict';

    var injectParams = ['$scope', '$state', 'constants'];
    var landingController = function ($scope, $state, constants) {
        
        $scope.openContactInfoPage = openContactInfoPage;
		 $scope.checkboxPage = checkboxPage;
        
        function openContactInfoPage(){
            $state.go(constants.state.contactInfo);
        };
		function checkboxPage(){
            $state.go(constants.state.checkboxPage);
        };
    };
    // inject dependencies
    landingController.$inject = injectParams;
    // register landingController component with disney_webapp
    angular.module('disney_webapp').controller('landingController', landingController);
}());

/**
 * Controller for Enrollement Page.
 */
(function () {
    'use strict';

    var injectParams = ['$scope', '$state', 'constants'];
    var contactInfoController = function ($scope, $state, constants) {
		
			$scope.activeOption = 'Resort Delivery';
			$scope.selectedSubDelivery = null;
			$scope.radioActions = function(deliveryType){
				$scope.activeOption = deliveryType;
			}
			$scope.resetstype = function(){
				$scope.selectedSubDelivery = null;
			}
			$scope.updateData = function(){
				if($scope.activeOption =="Ship To Home" &&($scope.selectedSubDelivery==null || $scope.selectedSubDelivery == undefined)){
					$scope.errorMsg ="Please Select an option from Ship to Home";
				}else{$scope.errorMsg= ""}
			}
			
			$scope.data = [
				{
					deliveryType	: 'Resort Delivery',
					id				: "resortDelivery",
					subText1		: "Disney Saratoga Springs front desk",
					subText2		: "Available for picku-up after 2:00 on December 3rd",
					subTitle		: "1 item not available for Resort Delivery",
					disableType		: false,
					subDelivery		: [],
					footerText		:""
				},
				{
					deliveryType: 'Ship To Home',
					id				: "shipToHome", 
					subText1		: "925 4th Ave Suite 1600 Seattle, WA 98104",
					subText2		: "",
					subTitle		: "Estimated delivery within 10 days",
					disableType		: false,
					subDelivery: [
						{ deliveryType: 'Ground: 10-20 business days',id:"groundShip", deliveryCost:"7.00"},
						{ deliveryType: 'Economy Air: 4-7 business days',id:"economyShip", deliveryCost:"10.00"},
						{ deliveryType: 'Express Air: 3-5 business days',id:"expressShip", deliveryCost:"13.00"}
					],
					footerText		:"All items in order availabe for Home Delivery"
				},
				{
					deliveryType: 'Park Gate Pickup',
					id				: "parkGatePickup",
					subText1		: "Available While Shopping in park",
					subText2		: "",
					subTitle		: "Location Service must be enabled",
					disableType		: true,
					subDelivery		: [],
					footerText		:""
				}
			];
		}
    // inject dependencies
    contactInfoController.$inject = injectParams;
    // register contactInfoController component with disney_webapp
    angular.module('disney_webapp').controller('contactInfoController', contactInfoController);
}());



/**
 * Controller for Enrollement Page.
 */
(function () {
    'use strict';

    var injectParams = ['$scope', '$state', 'constants'];
    var checkboxPageController = function ($scope, $state, constants) {
		$scope.data = [
				{
					mainText		: 'Yes! I would like to receive occasional updates, special offers and other information from ',
					linkText		: "Walt Disney Family of Companies.",
					url				: "http://google.com",
					checked			: false,
					disabled		: false
				},
				{
					mainText		: "I have read and agree to the",
					linkText		: "Disney Part Experience Website Terms and Conditions.",
					url				: "http://yahoo.com",
					checked			: false,
					disabled		: false
				},
				{
					mainText		: "I have read and agree to the",
					linkText		: "Terms and Conditions",
					url				: "http://reddiff.com",
					checked			: true,
					disabled		: true
				}
			];
		
		$scope.submitData = function(){
			
			/* if($scope.activeOption =="Ship To Home" &&($scope.selectedSubDelivery==null || $scope.selectedSubDelivery == undefined)){
				$scope.errorMsg ="Please Select an option from Ship to Home";
			}else{$scope.errorMsg= ""} */
		}
        
    };
    // inject dependencies
    checkboxPageController.$inject = injectParams;
    // register dummyController component with disney_webapp
    angular.module('disney_webapp').controller('checkboxPageController', checkboxPageController);
}());


/**
 * Class to hold all configurations related to Application Routing.
 */
(function(){
    'use strict';

    var injectParams = ['$stateProvider', '$urlRouterProvider', 'constants'];

    var uirouter = function($stateProvider, $urlRouterProvider, constants){
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state(constants.state.landing, {
            url: '/',
            templateUrl     : constants.getTemplateURL(constants.templateURLs.landing),
            controller      :'landingController'
        }).state(constants.state.contactInfo, {
            templateUrl     : constants.getTemplateURL(constants.templateURLs.contactInfo),
            controller      : 'contactInfoController'
        }).state(constants.state.checkboxPage, {
            templateUrl     : constants.getTemplateURL(constants.templateURLs.checkboxPage),
            controller      : 'checkboxPageController'
        });
    };
    uirouter.$inject = injectParams;

    angular.module('disney_webapp').config(uirouter);
}());
/**
 * Bootstrap for loading modules
 */
function bootStrapDisneyWebApp() {
    angular.bootstrap(angular.element('#disneyWebComponent'), ['disney_webapp']);
}
(function(){
    bootStrapDisneyWebApp();
}());   