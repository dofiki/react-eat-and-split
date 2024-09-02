const friendData = [
  {id:1, name:"Ram", image:"./user.png", balance: 0},
  {id:2, name:"Shyam", image:"./user.png", balance: 5},
  {id:3, name:"Rita", image:"./user.png", balance: -7}
]

export default function App(){
  return <div>
    <FriendList />
  </div>
}

function FriendList(){
  return <div className="friendList">
    {friendData.map((user)=>{
      return <Friend 
      key={user.id} 
      name={user.name} 
      image={user.image}
      balance={user.balance}/>
  })}
  <div className="addBtnContainer"><button className="addBtn">Add Friend</button></div>
  </div>
}

function Friend({name, image, balance}){

  function handleBalance(bal){
    if(bal===0){
      return <p className="userDescription" >you are all clear</p>
    }else if(bal<0){
      return <p className="userDescription" style={{color:"red"}} >you owe {name} ${Math.abs(bal)}.</p>
    }else{
      return <p className="userDescription" style={{color:"green"}} >{name} owes you ${Math.abs(bal)}.</p>
    }
  }

  return <div className="eachFriend">
   <div className="userInfo">
   <img src={image} alt="profile-photo" className="userImage"/>
    <div className="userInfoText">
      <h3 className="userName">{name}</h3>
      {handleBalance(balance)}
    </div>
   </div>
    <button className="selectBtn">select</button>
  </div>
}