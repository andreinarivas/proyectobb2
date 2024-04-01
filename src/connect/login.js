import { driver } from "./neo4j"

export const login = async(email,password)=>{
    const info = await driver.getServerInfo()
    console.log(info)
    
    try {
        const { records, summary, keys } = await driver.executeQuery(
            'MATCH (p:Person {email: $email, password:$password}) RETURN p',
            { age: email }, {password:password},
            { database: 'neo4j' }
          )
          
          // Summary information
          console.log(
            `>> The query ${summary.query.text} ` +
            `returned ${records.length} records ` +
            `in ${summary.resultAvailableAfter} ms.`
          )
          
          // Loop through results and do something with them
          console.log(records)
          
    } catch (error) {
        console.log(error);
    }
}