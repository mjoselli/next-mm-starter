'use client';

import Link from 'next/link';
import MetamaskIcon from '../../public/icons/MetamaskIcon';
import { Button } from './ui/button';
import { useSDK, MetaMaskProvider } from '@metamask/sdk-react';
import { formatAddress } from '../lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div className='relative'>
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button>
              <MetamaskIcon className='mr-2 h-4 w-4' />
              {formatAddress(account)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='right-0 top-10 z-10 mt-2 w-44 rounded-md border bg-gray-100 shadow-lg'>
            <button
              onClick={disconnect}
              className='block w-full py-2 pl-2 pr-4 text-left text-[#F05252] hover:bg-gray-200'
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button disabled={connecting} onClick={connect}>
          <MetamaskIcon className='mr-2 h-4 w-4' /> Connect Wallet
        </Button>
      )}
    </div>
  );
};

export const NavBar = () => {
  const host =
    typeof window !== 'undefined' ? window.location.host : 'defaultHost';

  const sdkOptions = {
    logging: { developerMode: true },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: 'Next-Metamask-Boilerplate',
      url: host // using the host constant defined above
    }
  };

  return (
    <nav className='mx-auto flex max-w-screen-xl items-center justify-between rounded-xl px-6 py-7'>
      <Link href='/crypto-values' className='text-2xl font-bold'>
        Crypto Values
      </Link>

      <span className='hidden text-2xl font-bold sm:block' />

      <MetaMaskProvider debug={true} sdkOptions={sdkOptions}>
        <ConnectWalletButton />
      </MetaMaskProvider>
    </nav>
  );
};

export default NavBar;
