<?php

$acc = "user";
$pass = "123456";

$check_acc = empty($_GET['acc'])? "": $_GET['acc'];
$check_pass = empty($_GET['pass'])? "": $_GET['pass'];




if($acc == $check_acc && $pass == $check_pass){
	echo json_encode('true');
}else{
	http_response_code(500);
	echo json_encode('false');
	
}