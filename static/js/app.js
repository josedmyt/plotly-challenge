// to add the name options to the dropdown menu
function chooseName() {
  d3.json("samples.json").then((importedData)=> {
    console.log(importedData);
    names = importedData.names;
    //console.log(names);
    names.forEach((name)=> {
      d3.select("#selDataset").append('option').attr('value', name).text(name);
    });
  });
};
chooseName();

//to build the plot when provided a specific name
function buildPlot(name) {
  d3.json("samples.json").then((importedData)=> {
    var jsonData = importedData;
    var nameIndex= jsonData.names.indexOf(name);
    var list = d3.select("#sample-metadata");
    list.html('');
    var metadata = jsonData.metadata[nameIndex];
    Object.entries(metadata).forEach(([key, value]) => {
      list.append('li').attr('class', 'list-group-item').text(key + ":" + value);
    });


    var trace1 ={
      y: jsonData.samples[nameIndex].otu_ids.slice(0,10).reverse().map(otuId=> 'OTU ' + otuId),
      x: jsonData.samples[nameIndex].sample_values.slice(0,10).reverse(),
      text: jsonData.samples[nameIndex].otu_labels.slice(0,10).reverse(), 
      type: 'bar',
      orientation: 'h'
    };

    var data =[trace1];

    var layout ={
      title : "Horizontal Bar Graph",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    var trace2 = {
      x: jsonData.samples[nameIndex].otu_ids.reverse(),
      y: jsonData.samples[nameIndex].sample_values.reverse(),
      mode: 'markers',
      marker: { size: jsonData.samples[nameIndex].sample_values.reverse(),
                color:jsonData.samples[nameIndex].otu_ids.reverse()
      },
      text: jsonData.samples[nameIndex].otu_labels.reverse(), 
      type: 'bubble'
    };

    data2= [trace2];

    var layout2 ={
      title : "Bubble Graph",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    
    Plotly.newPlot("bar", data, layout);
    Plotly.newPlot("bubble",data2,layout2)
  });


};

buildPlot('940');

d3.selectAll('body').on('change',buildPlotOfName);
function buildPlotOfName() {
  d3.event.preventDefault();
  var choice=  d3.select("#selDataset").node().value;
  console.log(choice)
  buildPlot(choice);
};


