//Rita cirkeldiagrammet för USA
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'genreName');
    data.addColumn('number', 'genreTotal');

    for (var i = 0; i < my_2d.length; i++) {
        data.addRow([my_2d[i].genreName, parseInt(my_2d[i].genreTotal)]);
    }

    var options = {
        title: 'Genre Popularity, US top 100'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

//Rita cirkeldiagrammet för UK
function drawNewChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'genreName');
    data.addColumn('number', 'genresTotal');

    for (var i = 0; i < my_new_2d.length; i++) {
        data.addRow([my_new_2d[i].genreName, parseInt(my_new_2d[i].genresTotal)]);
    }

    var options = {
        title: 'Genre Popularity, Sweden top 100'
    };

    var newChart = new google.visualization.PieChart(document.getElementById('newPieChart'));
    newChart.draw(data, options);
}

google.charts.setOnLoadCallback(drawNewChart);

//Rita cirkeldiagrammet för Sverige
function drawUKChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'genreName');
    data.addColumn('number', 'genresTotal');

    for (var i = 0; i < my_uk_2d.length; i++) {
        data.addRow([my_uk_2d[i].genreName, parseInt(my_uk_2d[i].genresTotal)]);
    }

    var options = {
        title: 'Genre Popularity, UK top 100'
    };

    var ukChart = new google.visualization.PieChart(document.getElementById('UKPieChart'));
    ukChart.draw(data, options);
}

google.charts.setOnLoadCallback(drawUKChart);