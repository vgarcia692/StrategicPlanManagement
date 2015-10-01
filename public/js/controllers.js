'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])

  //==============================GOALS==============================
  .controller('GoalCtrl', ['$scope', 'Goals', function($scope, Goals){
    
    Goals.query(function(DBGoals) {

      $scope.goals = DBGoals;

    });  

  }])

  //==============================GOALS DETAIL==============================
  .controller('GoalDetailCtrl', ['$scope', 'Goals', 'Objectives', '$routeParams', 'UserData', 'Activities', function($scope, Goals, Objectives, $routeParams, UserData, Activities) {
    
        UserData.get(function(DBUserData) {
        
            $scope.user = DBUserData.user;
       
        });

        $scope.goalId = $routeParams.id;

        $scope.goal = Goals.get({ id: $routeParams.id }, function(DBGoals) {
          
          $scope.kpis = DBGoals.KPIs;
          $scope.objectives = DBGoals.Objectives;
          $scope.activities = [];

          for (var i = 0; i < DBGoals.Objectives.length; i++) {
            for (var x = 0; x < DBGoals.Objectives[i].Activities.length; x++) {
                $scope.activities.push(DBGoals.Objectives[i].Activities[x]);
            };
          }

          $scope.submitStatus = function(id, status) {
                Activities.update({
                    id: id,
                    status: status
                }, function(){
                    alert('Activity Status Updated.');
                }, function(err) {
                    alert('Activity Failed to Update.');
                })    
          };

     
        });
  
    
  }])
  
//==============================KPI Update==============================
  .controller('KPIUpdateCtrl', ['$scope', '$http', '$routeParams', 'KPIs', function($scope, $http, $routeParams, KPIs) {
    
        KPIs.get({ id: $routeParams.id }, function(DBKPI){

            $scope.kpi = DBKPI;

            $scope.submitCurrentKPI = function(){
                DBKPI.current = $scope.kpi.newCurrent;
                DBKPI.$save();
            }
        
        });

        $scope.kpiValueEditAllowed = false;
        var newfile = {};
        $scope.uploadedFile = function(file){
            newfile = file;
        }

        $scope.upload = function() {
            if (newfile.size == undefined){
                alert('Please choose a file.');
            }
            else {
               var fd = new FormData();
            fd.append('file', newfile)

            $http.post('/api/kpiEvidenceUpload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).
                then(function(res) {
                    alert('File successfully uploaded.');
                    $scope.kpiValueEditAllowed = true;
                }, function(err) {
                    console.log(err);
                }) 
            }
            
        };
    
  }])


//==============================Activities Update==============================
  .controller('ActivityUpdateCtrl', ['$scope', '$http', '$routeParams', 'Activities', function($scope, $http, $routeParams, Activities) {
    
        Activities.get({ id: $routeParams.id }, function(DBAct){

            $scope.activity = DBAct;

            $scope.submitPercent = function(){
                DBAct.statusPercent = $scope.activity.newPercent;
                DBAct.$save();
            }
        
        });

        $scope.activityValueEditAllowed = false;
        var newfile = {};
        $scope.uploadedFile = function(file){
            newfile = file;
        }

        $scope.upload = function() {
            if (newfile.size == undefined){
                alert('Please choose a file.');
            }
            else {
               var fd = new FormData();
            fd.append('file', newfile)

            $http.post('/api/activityEvidenceUpload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).
                then(function(res) {
                    alert('File successfully uploaded.');
                    $scope.activityValueEditAllowed = true;
                }, function(err) {
                    console.log(err);
                }) 
            }
            
        };
    
  }])

  //=======================HOME=================================
  .controller('HomeCtrl', ['$scope', 'Activities', function ($scope, Activities) {

    //------------activities----------------
    var inProcessCount = 0;
    var notStartedCount = 0;
    var completedCount = 0;
    Activities.count({ count: true}, function(DBAct){
        for (var i = 0; i < DBAct.length; i++) {
            if (DBAct[i].status == 'In Process') {
                inProcessCount = DBAct[i].count;
            }
            if (DBAct[i].status == 'Not Started') {
                notStartedCount = DBAct[i].count;
            }
            if (DBAct[i].status == 'Completed') {
                completedCount = DBAct[i].count;
            }
        };
    
    var chart1 = {};
    chart1.type = "ColumnChart";
    chart1.cssStyle = "height:500px; width:1200px";
    chart1.data = {"cols": [
        {id: "status", label: "Status", type: "string"},
        {id: "goal1-id", label: "Goal 1", type: "number"},

    ], "rows": [
        {c: [
            {v: "Not Started"},
            {v: notStartedCount},
        ]},
        {c: [
            {v: "In Process"},
            {v: inProcessCount},
        ]},
        {c: [
            {v: "Completed"},
            {v: completedCount},
        ]}
    ]};

    chart1.options = {
        "title": "Strategic Activities Status",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Activities", "gridlines": {"count": 6}
        },
        "hAxis": {
            "title": "Status"
        }
    };

    chart1.formatters = {};

    $scope.chart = chart1;

    });



    Activities.query(function(DBActivities) {
        $scope.activities = DBActivities;
    })

  }])

//========================BOARD KPI=======================================
    .controller('BoardKPICtrl', ['$scope', 'BoardKPIs', 'UserData', function ($scope, BoardKPIs, UserData) {

        UserData.get(function(DBUserData) {
        
            $scope.user = DBUserData.user;
        });

        BoardKPIs.query(function(DBBoardKPIs) {
            $scope.boardKPIs = DBBoardKPIs;
        });

    }])
 //======================================= 
  .controller('AdminCtrl', function ($scope, $http) {
    // write Ctrl here
    // $http({
    //   method: 'GET',
    //   url: '/api/admin'
    // }).
    // success(function (data, status, headers, config) {
      $scope.name = 'Boss';
    // }).
    // error(function (data, status, headers, config) {
    //   $scope.name = 'Error!';
    // });

  })
  
  .controller('DeptCtrl', ['$scope', 'UserData', 'Goals', function ($scope, UserData, Goals) {
    // write Ctrl here
    Goals.query(function(DBGoals) {

      $scope.goals = DBGoals;

    });

    UserData.get(function(DBUserData) {
    
        $scope.user = DBUserData.user;
   
    });


  }])

  //========================BOARD KPI DETAIL=======================================
.controller('BoardKPIDetailCtrl', ['$scope', 'BoardKPIs', '$routeParams', function ($scope, BoardKPIs, $routeParams) {


        BoardKPIs.get({ id: $routeParams.id }, function(DBBKPI){

            $scope.bkpi = DBBKPI;

            $scope.submit = function(){
                DBBKPI.f15 = $scope.bkpi.f15;
                DBBKPI.sp16 = $scope.bkpi.sp16;
                DBBKPI.su16 = $scope.bkpi.su16;
                DBBKPI.f16 = $scope.bkpi.f16;
                DBBKPI.sp17 = $scope.bkpi.sp17;
                DBBKPI.su17 = $scope.bkpi.su17;
                DBBKPI.f17 = $scope.bkpi.f17;
                DBBKPI.sp18 = $scope.bkpi.sp18;
                DBBKPI.sp18 = $scope.bkpi.sp18;
                DBBKPI.f18 = $scope.bkpi.f18;
                DBBKPI.$update();
            }

        });

}])
  

//==============================PROGRESS REPORTS==============================
.controller('ProgRepCtrl', ['$scope', 'ProgReports', 'Objectives', '$routeParams', function($scope, ProgReports, Objectives, $routeParams) {

    $scope.status = '';
    $scope.narrative = '';
    $scope.editMode = false;
    var reportId = 0;

    $scope.obj = Objectives.get({ id: $routeParams.id }, function(DBObj) {

        $scope.reports = DBObj.ProgressReports;
    });

    // Create a new progress report
    $scope.submit = function() {
        var newReport = new ProgReports({
            status: $scope.status,
            report_narrative: $scope.narrative,
            ObjectiveId: $routeParams.id 
        });

        newReport.$save(function(progReport) {
            $scope.reports.push(progReport);
        });

    };

    // View a report in detail and make it able to edit
    $scope.view = function(index) {
        var status = $scope.reports[index].status;
        var narrative = $scope.reports[index].report_narrative;
        reportId = ($scope.reports[index].id);
        $scope.status = status
        $scope.narrative = narrative;
        $scope.editMode = true;
    };

    // Cancel editing a progress report
    $scope.cancel = function() {
        $scope.status = '';
        $scope.narrative = '';
        $scope.editMode = false;
    };

    // Save edits to a progress report
    $scope.save = function() {

        if ($scope.status && $scope.narrative) {
            //get report with reportId 
            ProgReports.get({ id: reportId }, function(DBprogRep) {
            DBprogRep.status = $scope.status,
            DBprogRep.report_narrative = $scope.narrative
            
            DBprogRep.$update({id: reportId}, function(reports) {
                $scope.reports = reports.response;
            });

            $scope.status = '';
            $scope.narrative = '';
            $scope.editMode = false;
        });
        } else {
            console.log('Empty');
        }
        
    };




}])



//==============================OBJECTIVE & BUDGET==============================
.controller('ObjDetailCtrl', ['$scope', 'UserData', 'Objectives', 'Budgets', '$routeParams', function ($scope, UserData, Objectives, Budgets, $routeParams) {
    
    // Delete template for ng-grid
    var removeTemplate = "<div style='align: center'><input class='btn btn-danger'type='button' value='X' ng-click='removeRow()'/></div>";

    // Global variables
    $scope.total = 0;
    var sum = 0;
    var currentValue = 0;

    // GET REQUEST OF SPECEFIC OBJECTIVE
    $scope.obj = Objectives.get({ id: $routeParams.id }, function(DBObj) {

        //get the total of the Line Items
        var getBudgetTotal = function() {
            for (var i = 0; i < $scope.obj.Budgets.length; i++) {
                sum += $scope.obj.Budgets[i].amount;
            }
            $scope.total = sum; 


        };
        getBudgetTotal();


        // Edit function
        $scope.$on('ngGridEventStartCellEdit', function(event) {
            currentValue = event.targetScope.row.entity.amount;
        });

        
        $scope.$on('ngGridEventEndCellEdit', function(event) {
            var editAmount = parseInt(event.targetScope.row.entity.amount);
            var editId = (event.targetScope.row.entity.id);

            Budgets.get({id: editId}, function(budget) {
                budget.amount = editAmount;
                budget.$update({id: editId}, function(updatedBudget) {
                    $scope.total -= currentValue;
                    $scope.total += updatedBudget.amount;
                });
            });
        });

        // create a new line item
        $scope.addLineItem = function() {
            if (!$scope.newLineItem) {
               console.log('Empty LineItem');  
            } else {
                var newLineItem = new Budgets({
                    ObjectiveId: $routeParams.id,
                    line_item: $scope.newLineItem.lineItemInput, 
                    source: $scope.newLineItem.fundingSourceInput,
                    amount: $scope.newLineItem.itemTotalInput           
                });
                
                newLineItem.$save(function(resultLineItem) {
                    $scope.obj.Budgets.push(resultLineItem);
                    $scope.total += resultLineItem.amount;
                    $scope.newLineItem = '';
                });
                
            }
            
        };

        // delete function for removing rows
        $scope.removeRow = function() {;
            var index = this.row.rowIndex;
            var answer = confirm('Are you sure to delete ' + this.row.entity.line_item + ' ?');
            
            if (answer == true) {
                $scope.gridOptions.selectItem(index, true);
                $scope.total -= this.row.entity.amount;
                $scope.obj.Budgets.splice(index, 1);
                Budgets.remove({id: this.row.entity.id});
            } else {
                return;
            }
        };

        //------Narrative Edit-----------
        $scope.narSave = function() {
            DBObj.narrative = $scope.obj.narrative;
            DBObj.$update({id: $routeParams.id}, function(obj) {
                $scope.obj.narrative = obj.narrative;
            });
        };

    });

    // Initialize the grid
    $scope.gridOptions = { 
        data: 'obj.Budgets',
        enableSorting: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        showFooter: true,
        footerTemplate: "<div style='text-align: center;'><p>Total: {{total | currency}}</p></div>",

        columnDefs: [
            { field: 'line_item', displayName: 'Line Item', enableCellEdit: true },
            { field: 'source', displayName: 'Funding Source', enableCellEdit: true },
            { field: 'amount', displayName: 'Amount',  enableCellEdit: true },
            { field: 'remove', displayName: 'Remove', cellTemplate: removeTemplate, editableCellTemplate: removeTemplate}
        ]     
    };

    

}]);



