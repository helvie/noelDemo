const noelLogos = [
    <p>&amp;</p>,
    <p>&lt;</p>,
    <p>&brvbar;</p>,
    <p>&dagger;</p>,
    <p>&sect;</p>,
    <p>&copy;</p>,
    <p>&laquo;</p>,
    <p>&amp;</p>,
    <p>&lt;</p>,
    <p>&brvbar;</p>,
    <p>&dagger;</p>,
    <p>&sect;</p>,
    <p>&copy;</p>,
    <p>&laquo;</p>,
    <p>&amp;</p>,
    <p>&lt;</p>,
    <p>&brvbar;</p>,
  ];

  const noelLogosJsx = noelLogos.map((data, i) => (
    <div key={i}> {data}</div>
  ));
  
  export { noelLogosJsx };


