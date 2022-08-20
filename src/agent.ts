import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  createTransactionEvent,
  getJsonRpcUrl

} from 'forta-agent'
import {CheckERC20Safety} from "./honeypot_is"



const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  if (!txEvent.to || txEvent.to===""){
  if (txEvent.receipt.contractAddress) {
    const isHoneypot = await CheckERC20Safety(txEvent.receipt.contractAddress)
    if (isHoneypot){
      findings.push(
        Finding.fromObject({
              name: "HONEYPOT_DETECTED",
              description: `Coin is honeypoy`,
              alertId: "Honeyspot",
              severity: FindingSeverity.High,
              type: FindingType.Exploit,
              metadata: {
                address: txEvent.receipt.contractAddress,
              },
            })
           )

         }
       
          
      }
    

    }
    
    

  return findings;
}

export default {
  handleTransaction
}