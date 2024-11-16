import { web3auth } from '@/providers/aa'
import { createWalletClient, custom } from 'viem'

type EthereumProvider = { request(...args: any): Promise<any> }

export const useWallet = () => {
  const provider = web3auth.provider
  const walletClient = createWalletClient({
    transport: custom(provider as EthereumProvider),
  })

  return {
    client: walletClient
  }
}