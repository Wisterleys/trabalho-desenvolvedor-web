<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>Sorteio</title>
</head>
<body>
<div class="container">
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Primeiro</th>
      <th scope="col">Último</th>
      <th scope="col">Nickname</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
<?php
$facilidade = include 'facilidade.php';
$dificuldade = include 'dificuldade.php';
$sorteio;
function verifica($facilidade,$dificuldade){
  $quantifacilidade = 0;
  foreach($facilidade  as $fa){
      $quantifacilidade+=$fa['alunos'];
  }
  echo $quantifacilidade;
  $contdif = 0;
  echo '<br/>';
  foreach($dificuldade  as $fa){
      $contdif+=$fa['tutores'];
  }
  echo $contdif;
}

function busca($value,$arr){
  $index=false;
  for($l=0;$l<$arr;$l++){
    if(array_search($value,$arr[$l]))
      {
        $index=['posicao'=>$l,'dados'=>$arr[$l]];
        break;
      }
  }
  return $index;
}
echo '<pre/>';
verifica($facilidade,$dificuldade);

//array_search('Ariana Grande', $arr[array_rand($arr,1)])

echo "<br>SEGUNDA PARTE: SORTEIO";
echo '<br>';
$res = busca('Ariana Grande',$facilidade);
print_r($res);

//echo $facilidade[$index]['nome']." ".$facilidade[$index]['alunos'];


echo "<br>";
echo "Com dificuldade: ".count($dificuldade);
echo "<br>";
echo "Com facilidade: ".count($facilidade);

?>
<!-- Conteúdo aqui -->
</div>
</body>
</html>