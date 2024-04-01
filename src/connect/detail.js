import  neo4j from 'neo4j-driver'

export const checkFavorite = async(recipeID, username,setFavorite)=>{
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
        let result = await driver.executeQuery(
            'MATCH (p:Person {username:$username})-[l:LIKED]->(r:Recipe{id:$id}) return l',
            {username:username, id:recipeID}, {database:'neo4j'}

        )
        if(result.records.length<1){
            setFavorite(false);
        }else{
            setFavorite(true);
        }
        driver.close();
        
    } catch (error) {
        console.log(error)
    }
}

export const getRecipeDetail = async(recipeID,setDetail)=>{
    console.log(recipeID)
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
        let recipe, author
        let ingredients=[]
        let cuisines=[] 
        let keywords =[]
        let result =await driver.executeQuery(
            'MATCH (p:Recipe {id:$id}) RETURN p', 
            {id:recipeID},{database:'neo4j'}
        )
        recipe = result.records.at(0)._fields[0].properties
       
        result = await driver.executeQuery(
            'MATCH (p:Recipe {id:$id})-[:CONTAINS_INGREDIENT]->(i) return i',
            {id:recipeID},{database:'neo4j'}
        )
        result.records.forEach((r)=>{
            ingredients.push(r._fields[0].properties)
        })
       
        result = await driver.executeQuery(
            'MATCH (p:Recipe {id:$id})<-[:WROTE]->(a:Author) return a',
            {id:recipeID},{database:'neo4j'}
        )
        author = result.records.at(0)._fields[0].properties
        
        result = await driver.executeQuery(
            'MATCH (p:Recipe {id:$id})-[:IS_TYPE]->(c) return c',
            {id:recipeID}, {database:'neo4j'}
        )
        result.records.forEach((r)=>{
            cuisines.push(r._fields[0].properties)
        })
        result = await driver.executeQuery(
            'MATCH (p:Recipe {id:$id})-[:CONTAINS_KEYWORD]->(k) return k',
            {id:recipeID}, {database:'neo4j'}
        )
        result.records.forEach((r)=>{
            keywords.push(r._fields[0].properties)
        })

        const details = {r:recipe,a:author, i:ingredients, c:cuisines, k:keywords}
        setDetail(details);
        driver.close();
        return details
        
    } catch (error) {
        console.log(error)
    }
}
export const checkFriends = async(user, username,setFriends)=>{
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
        let result = await driver.executeQuery(
            'MATCH (p:Person {username:$username})-[l:IS_FRIENDS_WITH]->(f:Person{username:$userfriend}) return l',
            {username:username, userfriend:user}, {database:'neo4j'}

        )
        if(result.records.length<1){
            setFriends(false);
        }else{
            setFriends(true);
        }
        driver.close();
        
    } catch (error) {
        console.log(error)
    }
}
