import dotenv from 'dotenv';
dotenv.config();

import { testE2E } from '../../../tests/utils-e2e';
import {
  Tokens,
  Holders,
  NativeTokenSymbols,
} from '../../../tests/constants-e2e';
import { Network, ContractMethod, SwapSide } from '../../constants';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { generateConfig } from '../../config';

describe('UniswapV3 E2E', () => {

  describe('UniswapV3', () => {
    const dexKey = 'UniswapV3';

    describe('UniswapV3 MAINNET', () => {
      const network = Network.MAINNET;
      const tokens = Tokens[network];
      const holders = Holders[network];
      const provider = new StaticJsonRpcProvider(
        generateConfig(network).privateHttpProvider,
        network,
      );

      it('BUY DAI -> USDC', async () => {
        await testE2E(
          tokens['DAI'],
          tokens['USDC'],
          holders['DAI'],
          '100000000000',
          SwapSide.BUY,
          dexKey,
          ContractMethod.simpleBuy,
          network,
          provider,
        );
      });
      it('SELL WETH -> SHIBA', async () => {
        await testE2E(
          tokens['WETH'],
          tokens['SHIBA'],
          holders['WETH'],
          '1000000000000000000',
          SwapSide.SELL,
          dexKey,
          ContractMethod.simpleSwap,
          network,
          provider,
        );
      });

      it('directSwap SELL WETH -> USDC', async () => {
        await testE2E(
          tokens['WETH'],
          tokens['USDC'],
          holders['WETH'],
          '1000000000000000000',
          SwapSide.SELL,
          dexKey,
          ContractMethod.directUniV3Swap,
          network,
          provider,
        );
      });
    });

    describe('UniswapV3 POLYGON', () => {
      const network = Network.POLYGON;
      const tokens = Tokens[network];
      const holders = Holders[network];
      const provider = new StaticJsonRpcProvider(
        generateConfig(network).privateHttpProvider,
        network,
      );

      const tokenASymbol: string = 'USDC';
      const tokenBSymbol: string = 'WETH';
      const nativeTokenSymbol = NativeTokenSymbols[network];

      const tokenAAmount: string = '11000000';
      const tokenBAmount: string = '11000000000000000000';
      const nativeTokenAmount = '11000000000000000000';

      const sideToContractMethods = new Map([
        [
          SwapSide.SELL,
          [
            ContractMethod.simpleSwap,
            ContractMethod.multiSwap,
            ContractMethod.megaSwap,
            ContractMethod.directUniV3Swap,
          ],
        ],
        [
          SwapSide.BUY,
          [
            ContractMethod.simpleBuy,
            ContractMethod.buy,
            ContractMethod.directUniV3Buy,
          ],
        ],
      ]);

      sideToContractMethods.forEach((contractMethods, side) =>
        contractMethods.forEach((contractMethod: ContractMethod) => {
          describe(`${contractMethod}`, () => {
            it(`${network} ${side} ${contractMethod} ${nativeTokenSymbol} -> ${tokenASymbol}`, async () => {
              await testE2E(
                tokens[nativeTokenSymbol],
                tokens[tokenASymbol],
                holders[nativeTokenSymbol],
                side === SwapSide.SELL ? nativeTokenAmount : tokenAAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${nativeTokenSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[nativeTokenSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : nativeTokenAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${tokenBSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[tokenBSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : tokenBAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
          });
        }),
      );
    });

    describe('UniswapV3 BSC', () => {
      const network = Network.BSC;
      const tokens = Tokens[network];
      const holders = Holders[network];
      const provider = new StaticJsonRpcProvider(
        generateConfig(network).privateHttpProvider,
        network,
      );

      const tokenASymbol: string = 'BUSD';
      const tokenBSymbol: string = 'WBNB';
      const nativeTokenSymbol = NativeTokenSymbols[network];

      const tokenAAmount: string = '100000000000000000000';
      const tokenBAmount: string = '1000000000000000000';
      const nativeTokenAmount = '1000000000000000000';

      const sideToContractMethods = new Map([
        [
          SwapSide.SELL,
          [
            ContractMethod.simpleSwap,
            ContractMethod.multiSwap,
            ContractMethod.megaSwap,
          ],
        ],
        [SwapSide.BUY, [ContractMethod.simpleBuy, ContractMethod.buy]],
      ]);

      sideToContractMethods.forEach((contractMethods, side) =>
        contractMethods.forEach((contractMethod: ContractMethod) => {
          describe(`${contractMethod}`, () => {
            it(`${network} ${side} ${contractMethod} ${nativeTokenSymbol} -> ${tokenASymbol}`, async () => {
              await testE2E(
                tokens[nativeTokenSymbol],
                tokens[tokenASymbol],
                holders[nativeTokenSymbol],
                side === SwapSide.SELL ? nativeTokenAmount : tokenAAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${nativeTokenSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[nativeTokenSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : nativeTokenAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${tokenBSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[tokenBSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : tokenBAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
          });
        }),
      );
    });

    describe('UniswapV3 Optimism', () => {
      const network = Network.OPTIMISM;
      const tokens = Tokens[network];
      const holders = Holders[network];
      const provider = new StaticJsonRpcProvider(
        generateConfig(network).privateHttpProvider,
        network,
      );

      const tokenASymbol: string = 'OP';
      const tokenBSymbol: string = 'ETH';
      const nativeTokenSymbol = NativeTokenSymbols[network];

      const tokenAAmount: string = '1000000000000000000';
      const tokenBAmount: string = '1000000000000000000';
      const nativeTokenAmount = '1000000000000000000';

      const sideToContractMethods = new Map([
        [
          SwapSide.SELL,
          [
            ContractMethod.simpleSwap,
            ContractMethod.multiSwap,
            ContractMethod.megaSwap,
          ],
        ],
        [SwapSide.BUY, [ContractMethod.simpleBuy, ContractMethod.buy]],
      ]);

      sideToContractMethods.forEach((contractMethods, side) =>
        contractMethods.forEach((contractMethod: ContractMethod) => {
          describe(`${contractMethod}`, () => {
            it(`${network} ${side} ${contractMethod} ${nativeTokenSymbol} -> ${tokenASymbol}`, async () => {
              await testE2E(
                tokens[nativeTokenSymbol],
                tokens[tokenASymbol],
                holders[nativeTokenSymbol],
                side === SwapSide.SELL ? nativeTokenAmount : tokenAAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${nativeTokenSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[nativeTokenSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : nativeTokenAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${tokenBSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[tokenBSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : tokenBAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
          });
        }),
      );
    });

    describe('UniswapV3 Avalanche', () => {
      const network = Network.AVALANCHE;
      const tokens = Tokens[network];
      const holders = Holders[network];
      const provider = new StaticJsonRpcProvider(
        generateConfig(network).privateHttpProvider,
        network,
      );

      const sideToContractMethods = new Map([
        [
          SwapSide.SELL,
          [
            ContractMethod.simpleSwap,
            ContractMethod.multiSwap,
            ContractMethod.megaSwap,
          ],
        ],
        [SwapSide.BUY, [ContractMethod.simpleBuy, ContractMethod.buy]],
      ]);

      const pairs: { name: string; sellAmount: string; buyAmount: string }[][] = [
        [
          {
            name: 'AVAX',
            sellAmount: '1000000000000000000',
            buyAmount: '500000',
          },
          {
            name: 'USDT',
            sellAmount: '1000000',
            buyAmount: '10000000000000000000',
          },
        ],
        [
          {
            name: 'AVAX',
            sellAmount: '1000000000000000000',
            buyAmount: '500000',
          },
          {
            name: 'USDC',
            sellAmount: '1000000',
            buyAmount: '1000000000000000000',
          },
        ],
        [
          {
            name: 'WAVAX',
            sellAmount: '1000000000000000000',
            buyAmount: '500000',
          },
          { name: 'USDC', sellAmount: '1000000', buyAmount: '20000000000000000' },
        ],
        [
          {
            name: 'WAVAX',
            sellAmount: '1000000000000000000',
            buyAmount: '10000000',
          },
          { name: 'USDT', sellAmount: '1000000', buyAmount: '2000000000000' },
        ],
        [
          { name: 'USDC', sellAmount: '1000000', buyAmount: '100000000' },
          { name: 'USDT', sellAmount: '100000000', buyAmount: '100000000' },
        ],
      ];

      sideToContractMethods.forEach((contractMethods, side) =>
        describe(`${side}`, () => {
          contractMethods.forEach((contractMethod: ContractMethod) => {
            pairs.forEach(pair => {
              describe(`${contractMethod}`, () => {
                it(`${pair[0].name} -> ${pair[1].name}`, async () => {
                  await testE2E(
                    tokens[pair[0].name],
                    tokens[pair[1].name],
                    holders[pair[0].name],
                    side === SwapSide.SELL
                      ? pair[0].sellAmount
                      : pair[0].buyAmount,
                    side,
                    dexKey,
                    contractMethod,
                    network,
                    provider,
                  );
                });
                it(`${pair[1].name} -> ${pair[0].name}`, async () => {
                  await testE2E(
                    tokens[pair[1].name],
                    tokens[pair[0].name],
                    holders[pair[1].name],
                    side === SwapSide.SELL
                      ? pair[1].sellAmount
                      : pair[1].buyAmount,
                    side,
                    dexKey,
                    contractMethod,
                    network,
                    provider,
                  );
                });
              });
            });
          });
        }),
      );
    });
  });

  describe('RamsesV2', () => {
    const dexKey = 'RamsesV2';

    describe('Arbitrum', () => {
      const network = Network.ARBITRUM;
      const tokens = Tokens[network];
      const holders = Holders[network];
      const provider = new StaticJsonRpcProvider(
        generateConfig(network).privateHttpProvider,
        network,
      );

      const tokenASymbol: string = 'USDCe';
      const tokenBSymbol: string = 'USDT';
      const nativeTokenSymbol = NativeTokenSymbols[network];

      const tokenAAmount: string = '1100000';
      const tokenBAmount: string = '1000000';
      const nativeTokenAmount = '1100000000000';

      const sideToContractMethods = new Map([
        [
          SwapSide.SELL,
          [
            ContractMethod.simpleSwap,
            ContractMethod.multiSwap,
            ContractMethod.megaSwap,
            ContractMethod.directUniV3Swap,
          ],
        ],
        [
          SwapSide.BUY,
          [
            ContractMethod.simpleBuy,
            ContractMethod.buy,
            ContractMethod.directUniV3Buy,
          ],
        ],
      ]);

      sideToContractMethods.forEach((contractMethods, side) =>
        contractMethods.forEach((contractMethod: ContractMethod) => {
          describe(`${contractMethod}`, () => {
            it(`${network} ${side} ${contractMethod} ${nativeTokenSymbol} -> ${tokenASymbol}`, async () => {
              await testE2E(
                tokens[nativeTokenSymbol],
                tokens[tokenASymbol],
                holders[nativeTokenSymbol],
                side === SwapSide.SELL ? nativeTokenAmount : tokenAAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${nativeTokenSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[nativeTokenSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : nativeTokenAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
            it(`${network} ${side} ${contractMethod} ${tokenASymbol} -> ${tokenBSymbol}`, async () => {
              await testE2E(
                tokens[tokenASymbol],
                tokens[tokenBSymbol],
                holders[tokenASymbol],
                side === SwapSide.SELL ? tokenAAmount : tokenBAmount,
                side,
                dexKey,
                contractMethod,
                network,
                provider,
              );
            });
          });
        }),
      );
    });
  });
});
