'use client';

import Link from 'next/link';
import TronIcon from '../../public/icons/TronIcon';
import { Button } from './ui/button';
import { useTronlink } from 'use-tronlink';

import { formatAddress } from '../lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';

export const ConnectTronWalletButton = () => {
  const {
    address, // The connected wallet address
    walletName, // The wallet name
    trxBalance, // The wallet TRX balance
    isConnected // A boolean checking it is connected or not
  } = useTronlink();

  return (
    <div className='relative'>
      {isConnected ? (
        <Popover>
          <PopoverTrigger>
            <Button>
              <TronIcon className='mr-2 h-4 w-4' />
              {formatAddress(address)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='right-0 top-10 z-10 mt-2 w-44 rounded-md border bg-gray-100 shadow-lg'></PopoverContent>
        </Popover>
      ) : (
        <Button disabled={true}>
          <TronIcon className='mr-2 h-4 w-4' /> No Wallet Connected
        </Button>
      )}
    </div>
  );
};

export default ConnectTronWalletButton;
