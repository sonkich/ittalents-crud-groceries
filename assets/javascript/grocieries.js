/**
 *
 */

$(function (){
	console.log("dom loaded");
	var grocs = [];
	var indexChange;

	$("#btn-login").on('click',function(){

		var params = {
				'acc' : $('#acc').val(),
				'pass' : $('#pass').val()
		}

		console.log(params);
		$.ajax({
			url:'login.php',
			method:'GET',
			dataType:'json',
			data: params,


		}).then(function(data){
			$('#login').css('display','none');
			$('#groc').css('display','block');
			$('#eror').css('display','none');

			getData();

			console.log("sucsses");
		},function(data){
			$('#eror').css('display','block');
			console.log('wrong name or pass');
		})
	});





	$("#btn-add").on('click',function(){
		$('#groc').css('display','none');
		$('#adding-form').css('display','block');
	});

	$('#btn-insert').on('click',function(){

		var name = $('#name').val();
		var quantity = $('#quantity').val();
		var price = $('#price').val();

		$('#name').val('');
		$('#quantity').val('');
		$('#price').val('');

		var input = [name , quantity , price];

		grocs.push(input);

		$('#adding-form').css('display','none');
		$('#groc').css('display','block');
		setGetData();


	});

	function setGetData(){
		var params = {
			'groc' : grocs
		};

		$.ajax({
			url:'data.php',
			method:'POST',
			dataType:'json',
			data: params


		}).then(function(data){




			displayData();
		},function(data){

			console.log('insert fail');
		})
	}

	function displayData(){


		$('#groc-table tbody').empty();

		for(let i = 0 ; i < grocs.length ; i++){


			$('#groc-table tbody')
			.append( '<tr>'+
			'<td>' + parseInt(i + 1) + '</td>' +
			'<td>' + grocs[i][0] + '</td>' +
			'<td>' + grocs[i][1] + '</td>' +
			'<td>' + grocs[i][2] + '</td>' +
			'<td>' + '<span class="fa fa-trash-o"></span><span class="fa fa-pencil"></span>' + '</td>'
			+'</tr>' );
		}

		$('.fa-trash-o').on('click',function(t){
			trashDel(t);
		});

		$('.fa-pencil').on('click',function(target){
			changeData(target);
		});


	};

	function changeData(t){
		indexChange = parseInt($(t.target).parent().siblings().first().html())-1;
		var name = $(t.target).parent().siblings().first().next().html();
		var quantity = $(t.target).parent().siblings().first().next().next().html();
		var price = $(t.target).parent().siblings().first().next().next().next().html();

		$('#nameC').val(name);
		$('#quantityC').val(quantity);
		$('#priceC').val(price);

		console.log(name);

		$('#change-form').css('display','block');
		$('#groc').css('display','none');

	};

	$('#btn-change').on('click',function (){

		var name = $('#nameC').val();
		var quantity = $('#quantityC').val();
		var price = $('#priceC').val();

		grocs[indexChange]= [name , quantity , price];

		$('#change-form').css('display','none');
		$('#groc').css('display','block');
		setGetData();


	})



	function trashDel(t){
		var index = parseInt($(t.target).parent().siblings().first().html())-1;
		grocs.splice(index, 1);


		setGetData();
	}

	function getData(){

		$.ajax({
			url:'data.php',
			method:'POST',
			dataType:'json'


		}).then(function(data){

			grocs =data;
			displayData();
		},function(data){
			console.log('insert fail');
		})
	}
});
