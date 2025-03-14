'use client';

import TronIcon from '../../public/icons/TronIcon';
import { Button } from './ui/button';
import React, { useState, useCallback, useEffect } from 'react';
import { formatAddress } from '../lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';

export const ConnectTronWalletButton = () => {
  const [trxBalance, setTrxBalance] = useState(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [walletName, setWalletName] = useState<string>('');

  const connectToWallet = useCallback(async (): Promise<boolean> => {
    if (window.tronLink) {
      await window.tronLink.request({ method: 'tron_requestAccounts' });
    }

    if (!window.tronWeb) return false;

    const { name, base58 } = window.tronWeb.defaultAddress;

    if (base58) {
      setAddress(base58);
      setWalletName(name || '');
      setIsConnected(true);

      const trxAmount = await window.tronWeb.trx.getBalance(base58);
      setTrxBalance(trxAmount);

      return true;
    }

    setIsConnected(false);
    return false;
  }, []);

  const cleanData = useCallback(() => {
    setTrxBalance(0);
    setIsConnected(false);
    setAddress('');
    setWalletName('');
  }, []);

  useEffect(() => {
    const handleMessage = async (msg: MessageEvent) => {
      const { message } = msg.data;

      if (!message) return;

      if (
        message.action === 'setAccount' ||
        message.action === 'setNode' ||
        message.action === 'tabReply' ||
        message.action === 'accountsChanged'
      ) {
        if (message.data.address) {
          connectToWallet();
        }

        if (message.action !== 'tabReply' && !message.data.address) {
          cleanData();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [connectToWallet, cleanData]);

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
          <PopoverContent className='right-0 top-10 z-10 mt-2 w-44 rounded-md border bg-gray-100 shadow-lg'>
            <button
              onClick={cleanData}
              className='block w-full py-2 pl-2 pr-4 text-left text-[#F05252] hover:bg-gray-200'
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button onClick={connectToWallet}>
          <TronIcon className='mr-2 h-4 w-4' /> Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectTronWalletButton;
