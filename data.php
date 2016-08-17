<?php

$groc = [
   ['apple','2','4']
];

if(!empty($_POST['groc'])){
   $groc = $_POST['groc'];
}





echo json_encode($groc);
