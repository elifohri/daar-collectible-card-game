function ListCards() {

  let cards = ["barbie", "ken", "pokemon", "spiderman"];
  //cards = []; 
  const message = cards.length === 0 ? <p>No item found for this user.</p> : null;

  return (
    <>
      <h3>List of Collections</h3>
      {message}
      <ul className="list-group">
        {cards.map((card) => (
          <li className="list-group-card" key={card}>{card}</li>
        ))}
      </ul>
    </>
  );
  
  }
  
  export default ListCards;