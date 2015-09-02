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
  .controller('GoalDetailCtrl', ['$scope', 'Goals', 'Objectives', 'Users', '$routeParams', function($scope, Goals, Objectives, Users, $routeParams) {
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

     
    });

    Users.query(function(DBUsers) {
          $scope.users = DBUsers;

    // CREATE A NEW OBJECTIVE
        Date.prototype.yyyyMMdd = function () {
            var yyyy = this.getFullYear().toString();
            var MM = (this.getMonth()+1).toString(); // getMonth() is zero-based
            var dd = this.getDate().toString();
            return yyyy + "-" + (MM[1]?MM:"0"+MM[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
        };

        $scope.submitObj = function() {
            var newObj = new Objectives({
              objective: $scope.newObj.objective,
              assigneeId: $scope.newObj.assigneeId,
              due_date: new Date($scope.newObj.due_date).yyyyMMdd(),
              goalId: $routeParams.id,
              createdAt: new Date()
            });
            
            newObj.$save(function(DBObj) {
              $scope.objectives.push(DBObj);
              $scope.newObj = '';
            });

        };


    });

   
  
    
  }])
  
  //=======================HOME=================================
  .controller('HomeCtrl', ['$scope', function ($scope) {

    var chart1 = {};
    chart1.type = "ColumnChart";
    chart1.cssStyle = "height:500px; width:600px";
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "goal1-id", label: "Goal 1", type: "number"},
        {id: "goal2-id", label: "Goal 2", type: "number"},
        {id: "goal3-id", label: "Goal 3", type: "number"},
        {id: "goal4-id", label: "Goal 4", type: "number"},
        {id: "goal5-id", label: "Goal 5", type: "number"}
    ], "rows": [
        {c: [
            {v: "Not Started"},
            {v: 19, f: "19"},
            {v: 12, f: "12"},
            {v: 7, f: "7"},
            {v: 4},
            {v: 6}
        ]},
        {c: [
            {v: "In Process"},
            {v: 13},
            {v: 1, f: "1)"},
            {v: 12},
            {v: 2},
            {v: 6}
        ]},
        {c: [
            {v: "Completed"},
            {v: 24},
            {v: 0},
            {v: 11},
            {v: 6},
            {v: 6}
        ]}
    ]};

    chart1.options = {
        "title": "Total Objective Activities Status",
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

    //-----------

    var chart2 = {};
    chart2.type = "PieChart";
    chart2.cssStyle = "height:500px; width:600px";
    chart2.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "goal1-id", label: "Goal 1", type: "number"},
        {id: "goal2-id", label: "Goal 2", type: "number"},
        {id: "goal3-id", label: "Goal 3", type: "number"},
        {id: "goal4-id", label: "Goal 4", type: "number"},
        {id: "goal5-id", label: "Goal 5", type: "number"}
    ], "rows": [
        {c: [
            {v: "Not Started"},
            {v: 19},
            {v: 12},
            {v: 7},
            {v: 4},
            {v: 6}
        ]},
        {c: [
            {v: "In Process"},
            {v: 13},
            {v: 1},
            {v: 12},
            {v: 2},
            {v: 6}
        ]},
        {c: [
            {v: "Completed"},
            {v: 24},
            {v: 0},
            {v: 11},
            {v: 6},
            {v: 6}
        ]}
    ]};

    chart2.options = {
        "title": "Total Key Performance Indicator Status",
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

    chart2.formatters = {};

    $scope.chart2 = chart2;

  }])

//========================BOARD KPI=======================================
    .controller('BoardKPICtrl', ['$scope', 'BoardKPIs', function ($scope, BoardKPIs) {

        BoardKPIs.query(function(DBBoardKPIs) {
            $scope.boardKPIs = DBBoardKPIs;
        });

    }])
  
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



