<?php
$facilidade = include 'facilidade.php';
$dificuldade = include 'dificuldade.php';
function prints($value){
  echo $value;
}
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
  for($l=0;$l<count($arr);$l++){
    if(array_search($value,$arr[$l]))
      {
        $index=['posicao'=>$l,'dados'=>$arr[$l]];
        break;
      }
  }
  return $index;
}
function sorteo($tutores,$alunos){
  $resultado=[];
  $counter = 0;
    while ($counter < count($tutores)){
      if(busca($tutores[$counter]['nome'],$resultado)){
        $resultado[]= $tutores[array_rand($tutores,1)];
        $counter++;
      }
    }
    return $resultado;
}
$res = array('facilidade'=>$facilidade,'dificuldade'=>$dificuldade);
echo json_encode($res);
/*
//array_search('Ariana Grande', $arr[array_rand($arr,1)])

echo "<br>SEGUNDA PARTE: SORTEIO";
echo '<br>';
//busca('Ana Paula',$facilidade)?prints('encontrei'):prints('não encontrei');

//echo $facilidade[$index]['nome']." ".$facilidade[$index]['alunos'];
print_r(sorteo($facilidade,$dificuldade));

echo "<br>";
echo "Com dificuldade: ".count($dificuldade);
echo "<br>";
echo "Com facilidade: ".count($facilidade);
*/
?>