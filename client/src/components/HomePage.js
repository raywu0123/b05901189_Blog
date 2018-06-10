import React from 'react'

export default () => {
  return (
    <div style={{textAlign: "center"}}>
    <h3> Accounts: </h3>
      <h4>
        There are currently three accounts on the system <br/>
        their users-names are: Alice, Bob, and Carol.<br/>
        You can click the LOGIN button to sign in by entering your username.<br/><br/>
          <a href={'/Alice'}> Alice's page </a><br/>
          <a href={'/Bob'}> Bob's page </a><br/>
          <a href={'/Carol'}> Carol's page </a><br/>
      </h4>
    <h3> Navigation: </h3>
      <h4>
        You can click on your username to go to your blog.<br/>
        You can also go to other people's page by appending their username to the site's url.<br/>
        For Example: https://client-sxiwctyuqf.now.sh/Alice
      </h4>   
    <h3> Contact Site Maintianer</h3>
        <a href={"b05901189@ntu.edu.tw"}> b05901189@ntu.edu.tw </a> 
    
    </div>
  )
}
