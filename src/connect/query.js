import  neo4j from 'neo4j-driver'

export const getUserInfo = async(username, setInfo)=>{
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
    const ingredients =[]
    const recipes=[ ]
    const cuisines =[]
    const friends = []
    let result =await driver.executeQuery(
        'MATCH (p:Person {username:$username})-[:FAVORITES]->(h) RETURN h', 
        {username:username},{database:'neo4j'}
    )
    result.records.forEach((record)=>{
        ingredients.push(record._fields[0].properties.name)
    })
   
    result =await driver.executeQuery(
        'MATCH (p:Person {username:$username})-[:ENJOYS]->(h) RETURN h', 
        {username:username},{database:'neo4j'}
    )
    result.records.forEach((record)=>{
        cuisines.push(record._fields[0].properties.name)
    })

    result =await driver.executeQuery(
        'MATCH (p:Person {username:$username})-[:LIKED]->(h) RETURN h', 
        {username:username},{database:'neo4j'}
    )
    result.records.forEach((record)=>{
        recipes.push(record._fields[0].properties.name)
    })
   
    result =await driver.executeQuery(
        'MATCH (p:Person {username:$username})-[:IS_FRIENDS_WITH]->(h) RETURN h', 
        {username:username},{database:'neo4j'}
    )
    result.records.forEach((record)=>{
        friends.push(record._fields[0].properties.username)
    })
   
    const userInfo = {i:ingredients,r:recipes, c:cuisines, f:friends }
    driver.close()
    setInfo(userInfo) ;
    return userInfo
    
    
  } catch (error) {
    
  }
}

export const getRecByRecipe = async(username, setRecipes)=>{
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
        
        let recipes=[]
        let result =await driver.executeQuery(
            'MATCH(p:Person{username:$username})-[:LIKED]->(r)-[:CONTAINS_INGREDIENT]->(i:Ingredient)<-[:CONTAINS_INGREDIENT]-(rec:Recipe)with rec, count(*) as common return rec order by common desc limit 9', 
            {username:username},{database:'neo4j'}
        )
        console.log(result.records)
        result.records.forEach((r)=>{
           recipes.push( r._fields[0].properties)
        })
        setRecipes(recipes);
        driver.close();
        return recipes;
    } catch (error) {
        
    }
  
}
export const getRecByFriends = async(username, setRecipes)=>{
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
        
        let recipes=[]
        let result =await driver.executeQuery(
            'MATCH(p:Person{username:$username})-[:IS_FRIENDS_WITH]->(r)-[:LIKED]->(rec:Recipe)with rec, count(*) as common return rec order by common desc limit 9', 
            {username:username},{database:'neo4j'}
        )
        console.log(result.records)
        result.records.forEach((r)=>{
           recipes.push( r._fields[0].properties)
        })
        setRecipes(recipes);
        driver.close();
        return recipes;
    } catch (error) {
        
    }
  
}

export const searchRecipes = async(search, filter, setFound)=>{
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
    console.log(filter)
    console.log(search)
    let recipes=[]
    let result
    switch (filter) {
      case 'ingredient':
        result =await driver.executeQuery(
        'MATCH (p)-[:CONTAINS_INGREDIENT]->(i:Ingredient{name:$name}) return p limit 100', 
        {name:search},{database:'neo4j'}
        )
        break;
    
      case 'author':
        result =await driver.executeQuery(
          'MATCH (a:Author {name:$name})-[:WROTE]->(r) return r limit 100', 
          {name:search},{database:'neo4j'}
          )
        
        break;
    
      case 'cuisine':
        result =await driver.executeQuery(
          'MATCH (p)-[:IS_TYPE]->(c:Cuisine{name:$name}) return p limit 100', 
          {name:search},{database:'neo4j'}
          )
        
        break;
    
      case 'user':
        result =await driver.executeQuery(
        'MATCH (p:Person) WHERE p.username CONTAINS $username return p limit 100', 
          {username:search},{database:'neo4j'}
          )
        
        break;
    
      default:
        console.log('default')
        result =await driver.executeQuery(
          'MATCH (r:Recipe ) WHERE r.name CONTAINS $name return r limit 100', 
            {name:search},{database:'neo4j'}
            )
           
        break;

  } 
  result.records.forEach((r)=>{
    recipes.push(r._fields[0].properties);
  })
  setFound(recipes);
  console.log(recipes)
  driver.close()
}catch (error) {
    console.log(error)
    }
    
    
 
}