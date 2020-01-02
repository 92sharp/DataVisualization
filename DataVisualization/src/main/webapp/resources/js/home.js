/*
$(document).ready(function() {
    load_winelist();
});
 

function load_winelist(){
    var wineList;
    
    $("#load_wineList").click(function(){  
    
    	// Graph dimension
    	var margin = {top: 20, right: 20, bottom: 20, left: 20},
    	    width = 430 - margin.left - margin.right,
    	    height = 430 - margin.top - margin.bottom

    	// Create the svg area
    	var svg = d3.select("#my_dataviz")
    	  .append("svg")
    	    .attr("width", width + margin.left + margin.right)
    	    .attr("height", height + margin.top + margin.bottom)
    	  .append("g")
    	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    	
    	
        var url="/wine";  
         
  
        $.ajax({      
            type:"POST",  
            url:url,      
                 
            success:function(args){
                wineList = args;
                var data = [];
                for(var i=0;i<args.length;i++){
                	var x = Object.keys(args[i])[i];
                	for(var j=0;j<args.length;j++){
                		var y = Object.keys(args[i])[j];
                		var value = args[i][y];
                		data.push({
                			x:x,
                			y:y,
                			value: +value
                		});
                	}		
                }
                // List of all variables and number of them
                var domain = d3.set(data.map(function(d) { return d.x })).values()
                var num = Math.sqrt(data.length)

                // Create a color scale
                var color = d3.scaleLinear()
                  .domain([-1, 0, 1])
                  .range(["#B22222", "#fff", "#000080"]);

                // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
                var size = d3.scaleSqrt()
                  .domain([0, 1])
                  .range([0, 9]);

                // X scale
                var x = d3.scalePoint()
                  .range([0, width])
                  .domain(domain)

                // Y scale
                var y = d3.scalePoint()
                  .range([0, height])
                  .domain(domain)

                // Create one 'g' element for each cell of the correlogram
                var cor = svg.selectAll(".cor")
                  .data(data)
                  .enter()
                  .append("g")
                    .attr("class", "cor")
                    .attr("transform", function(d) {
                      return "translate(" + x(d.x) + "," + y(d.y) + ")";
                    });

                // Low left part + Diagonal: Add the text with specific color
                cor
                  .filter(function(d){
                    var ypos = domain.indexOf(d.y);
                    var xpos = domain.indexOf(d.x);
                    return xpos <= ypos;
                  })
                  .append("text")
                    .attr("y", 5)
                    .text(function(d) {
                      if (d.x === d.y) {
                        return d.x;
                      } else {
                        return d.value.toFixed(2);
                      }
                    })
                    .style("font-size", 11)
                    .style("text-align", "center")
                    .style("fill", function(d){
                      if (d.x === d.y) {
                        return "#000";
                      } else {
                        return color(d.value);
                      }
                    });


                // Up right part: add circles
                cor
                  .filter(function(d){
                    var ypos = domain.indexOf(d.y);
                    var xpos = domain.indexOf(d.x);
                    return xpos > ypos;
                  })
                  .append("circle")
                    .attr("r", function(d){ return size(Math.abs(d.value)) })
                    .style("fill", function(d){
                      if (d.x === d.y) {
                        return "#000";
                      } else {
                        return color(d.value);
                      }
                    })
                    .style("opacity", 0.8)
                
                //console.log(wineList);
            },   
            beforeSend:function(){
                $("#wineList").empty();  
            },
            error:function(e){  
                alert(e.responseText);  
            }  
        });  
      
    });
    
}

*/


//Graph dimension
var margin = {top: 35, right: 35, bottom: 35, left: 35},
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom

// Create the svg area
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// ajax로 데이터 가져오기
var url="/wine";  
var wineList;
$.ajax({      
    type:"POST",  
    url:url,      
         
    success:function(args){
        wineList = args;
      
        // 각 항목의 평균 구하기
        var mean = [];       
        for(var i=0;i<13;i++){
        	mean.push(0);
        }
        for(var i=0;i<args.length;i++){
        	for(var j=0;j<13;j++){
        		var col = Object.keys(args[i])[j];
        		mean[j] += args[i][col];
        	}
        }
        for(var i=0;i<13;i++)
        	mean[i] /= args.length;
        console.log(mean);
        
        // 각 항목의 표준편차 구하기
        var stddev = [];
        for(var i=0;i<13;i++){
        	stddev.push(0);
        }
        for(var i=0;i<args.length;i++){
        	for(var j=0;j<13;j++){
        		var a = Object.keys(args[i])[j];
        		var b = (args[i][a] - mean[j]);
        		stddev[j] += b*b;
        	}
        }
        for(var i=0;i<13;i++){
        	stddev[i] = Math.sqrt(stddev[i])
        }
        console.log(stddev);
        
        // 각 (x,y) 항목의 공분산 구하기
        var corr = [];
        for(var i=0;i<78;i++){
        	corr.push(0);
        }
        for(var i=0;i<args.length;i++){
        	var t = 0;
        	for(var j=0;j<13;j++){
        		var a = Object.keys(args[i])[j];
        		for(var k=j+1;k<13;k++){
        			var b = Object.keys(args[i])[k];
        			var x = args[i][a];
        			var y = args[i][b];
        			corr[t] += (x-mean[j])*(y-mean[k]);
        			t += 1;
        		}
        	}
        	t = 0;
        }
        console.log(corr);
        
        // 각 (x,y) 항목의 상관계수 구하기
        var data = [];
        var t = 0;
        for(var i=0;i<13;i++){
        	var x = Object.keys(args[0])[i];
        	for(var j=i;j<13;j++){
        		var y = Object.keys(args[0])[j];
        		if(j == i){
        			var value = 1;
        			data.push({
            			x:x,
            			y:y,
            			value: +value
            		});
        		}
        		else{
        			var value = corr[t]/(stddev[i]*stddev[j]);
        			data.push({
            			x:x,
            			y:y,
            			value: +value
            		});
            		t += 1;
        		}
        	}
        }
        console.log(data);
        
        // List of all variables and number of them
        var domain = d3.set(data.map(function(d) { return d.x })).values()
        var num = Math.sqrt(data.length)
        console.log(domain)
		
        // Create a color scale
        var color = d3.scaleLinear()
          .domain([-1, 0, 1])
          .range(["#F15F5F", "#fff", "#0100FF"]);
          //.range(["#B22222", "#fff", "#000080"]);
        	
        // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
        var size = d3.scaleSqrt()
          .domain([0, 1])
          .range([0, 9]);

        // X scale
        var x = d3.scalePoint()
          .range([0, width])
          .domain(domain)

        // Y scale
        var y = d3.scalePoint()
          .range([0, height])
          .domain(domain)

        // Create one 'g' element for each cell of the correlogram
        var cor = svg.selectAll(".cor")
          .data(data)
          .enter()
          .append("g")
            .attr("class", "cor")
            .attr("transform", function(d) {
              return "translate(" + x(d.x) + "," + y(d.y) + ")";
            });

        // Low left part + Diagonal: Add the text with specific color
        cor
          .filter(function(d){
            var ypos = domain.indexOf(d.y);
            var xpos = domain.indexOf(d.x);
            return xpos <= ypos;
          })
          .append("text")
            .attr("y", 5)
            .text(function(d) {
              if (d.x === d.y) {
                return d.x;
              } else {
                return d.value.toFixed(2);
              }
            })
            .style("font-size", 11)
            .style("text-align", "center")
            .style("fill", function(d){
              if (d.x === d.y) {
                return "#000";
              } else {
                return color(d.value);
              }
            });


        // Up right part: add circles
        cor
          .filter(function(d){
            var ypos = domain.indexOf(d.x);
            var xpos = domain.indexOf(d.y);
            console.log(ypos+":"+xpos);
            return xpos > ypos;
          })
          .append("circle")
            .attr("r", function(d){ return size(Math.abs(d.value)) })
            .style("fill", function(d){
              if (d.x === d.y) {
                return "#000";
              } else {
                return color(d.value);
              }
            })
            .style("opacity", 0.8)
        
        //console.log(wineList);

    }
});


/*

function load_winelist(){
    var wineList;
    var html;
    $("#load_wineList").click(function(){  
    
        var url="/wine";  
        //var params="param1="+param1+"¶m2="+param1;  
  
        $.ajax({      
            type:"POST",  
            url:url,      
            //data:params,      
            success:function(args){
                wineList = args;
                for(var i=0;i<args.length;i++){
                    html = "<tr>"
                            + "<td>" + args[i].product_seq + "</td>" 
                            + "<td>" + args[i].fuxed_acidity + "</td>"
                            + "<td>" + args[i].volatile_acidity + "</td>"
                            + "<td>" + args[i].citric_acid + "</td>"
                            + "<td>" + args[i].residual_sugar + "</td>"
                            + "<td>" + args[i].chlorides + "</td>"
                            + "<td>" + args[i].free_sulfur_dioxide + "</td>"
                            + "<td>" + args[i].total_sulfur_dioxide + "</td>"
                            + "<td>" + args[i].density + "</td>"
                            + "<td>" + args[i].pH + "</td>"
                            + "<td>" + args[i].sulphates + "</td>"
                            + "<td>" + args[i].alcohol + "</td>"
                            + "<td>" + args[i].quality + "</td>"
                            "</tr>";
                    $("#wineList").append(html);
                }
                
                console.log(args);
            },   
            beforeSend:function(){
                $("#wineList").empty();  
            },
            error:function(e){  
                alert(e.responseText);  
            }  
        });  
      
    });
}
*/

