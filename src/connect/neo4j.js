
import  neo4j from 'neo4j-driver'

export const connect = async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = 'neo4j+s://a37e5924.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'tJ0Tw79AqP32wv_uwZb6pKb1P-EWqsOujEP50Eg2WnM'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
  
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
    return driver;
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
};

export const login = async(email, pass)=>{
  const URI = 'neo4j+s://a37e5924.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'tJ0Tw79AqP32wv_uwZb6pKb1P-EWqsOujEP50Eg2WnM'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
  
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }

  try {
    const { records, summary, keys } = await driver.executeQuery(
        'MATCH (p:Person {email: $email, password:$pass}) RETURN p',
        { email: email, pass: pass },
        { database: 'neo4j' }
      )
      driver.close()
    if(records.length>0){
      const u = records.at(0)._fields[0].properties
      return u;
    }else{
      return null;
    }
      
} catch (error) {
    console.log(error);
}

}

export const register=async(email, pass, username)=>{
  const URI = 'neo4j+s://a37e5924.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'tJ0Tw79AqP32wv_uwZb6pKb1P-EWqsOujEP50Eg2WnM'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
  
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
  try {
    const { records } = await driver.executeQuery(
      'MATCH (p:Person {username: $user}) RETURN p',
      { user:username},
      { database: 'neo4j' }
    )
  if(records.length>0){
    const u = records.at(0)._fields[0].properties
    throw new Error('username already exists');
  }else{
    const { records} = await driver.executeQuery(
      'MATCH (p:Person {email: $email}) RETURN p',
      { email:email},
      { database: 'neo4j' }
    )
    if(records.length>0){
    const u = records.at(0)._fields[0].properties
    throw new Error('email already exists');
   } else{
    let session = driver.session({database:'neo4j'})
    const {records} = await session.executeWrite(async wt =>{
      const result = await wt.run('CREATE (p:Person {email: $email, password:$pass, username:$username}) return p', { email: email, pass:pass, username:username })
      
      return result;
    })
    driver.close()
    session.close();
    return (records.at(0)._fields[0].properties)
  }
  } }catch (error) {
      return error
  }

}

export const addToFavorite = async(recipeID, username)=>{
  const URI = 'neo4j+s://a37e5924.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'tJ0Tw79AqP32wv_uwZb6pKb1P-EWqsOujEP50Eg2WnM'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
    let session = driver.session({database:'neo4j'})
    const {records} = await session.executeWrite(async wt =>{
      const result = await wt.run('MATCH(p:Person {username:$username}),(r:Recipe {id:$id}) CREATE (p)-[t:LIKED]->(r) return t', { username:username, id:recipeID })
      return result;
    })
    driver.close()
      session.close();
      console.log(records)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
  
    
}
export const removeFavorite = async(recipeID, username)=>{
  const URI = 'neo4j+s://a37e5924.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'tJ0Tw79AqP32wv_uwZb6pKb1P-EWqsOujEP50Eg2WnM'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
    let session = driver.session({database:'neo4j'})
    const {records} = await session.executeWrite(async wt =>{
      const result = await wt.run('MATCH(p:Person {username:$username}),(r:Recipe {id:$id}) DELETE (p)-[t:LIKED]->(r) return t', { username:username, id:recipeID })
      return result;
    })
    driver.close()
      session.close();
      console.log(records)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
  
    
}

export const addFriend = async(username, friend)=>{
  const URI = 'neo4j+s://a37e5924.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'tJ0Tw79AqP32wv_uwZb6pKb1P-EWqsOujEP50Eg2WnM'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
    let session = driver.session({database:'neo4j'})
    const {records} = await session.executeWrite(async wt =>{
      const result = await wt.run('MATCH(p:Person {username:$user}),(f:Person {username:$username}) CREATE (p)-[t:IS_FRIENDS_WITH]->(f) return t', { user:username, username:friend })
      return result;
    })
    driver.close()
      session.close();
      console.log(records)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
  
    
}
export const removeFriend = async(username, friend)=>{
  const URI = 'neo4j+s://a37e5924.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'tJ0Tw79AqP32wv_uwZb6pKb1P-EWqsOujEP50Eg2WnM'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
    let session = driver.session({database:'neo4j'})
    const {records} = await session.executeWrite(async wt =>{
      const result = await wt.run('MATCH(p:Person {username:$user}),(f:Person {username:$username}), (p)-[t:IS_FRIENDS_WITH]->(f) DELETE t', { username:username, username:friend })
      return result;
    })
    driver.close()
      session.close();
      console.log(records)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
  
    
}