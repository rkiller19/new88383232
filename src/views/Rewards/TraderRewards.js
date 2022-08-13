import React from "react";
import { ETH_DECIMALS, formatAmount, shortenAddress, USD_DECIMALS, formatTimeTill } from "../../Helpers";
import * as Styles from "./Rewards.styles";
import Davatar from '@davatar/react';
import { EmptyAvatar } from './Rewards.styles'
import WeekDropdown from "./WeekDropdown";

export default function TraderRewards(props) {
  const {
    active,
    account,
    ensName,
    userData,
    totalRewardAmountUsd,
    unclaimedRewardsUsd,
    rewardsMessage,
    allWeeksRewardsData,
    setSelectedWeek,
    connectWallet,
    userWeekData,
    currentView,
    trackAction,
    nextRewards,
    latestWeek
  } = props;

  const timeTillRewards = formatTimeTill(nextRewards / 1000);

  return (
    <Styles.PersonalRewardsContainer hidden={currentView === "Leaderboard"}>
      <Styles.AccountBanner className="App-card">
        {active && (
          <Styles.AccountBannerAddresses>
            {account ? <Davatar size={40} address ={account} /> : <EmptyAvatar />}
            <Styles.AppCardTitle>{ensName || shortenAddress(account, 13)}</Styles.AppCardTitle>
            <Styles.AccountBannerShortenedAddress> Wallet address </Styles.AccountBannerShortenedAddress>
          </Styles.AccountBannerAddresses>
        )}
        {!active && (
          <Styles.AccountBannerAddresses>
            <Styles.AppCardTitle>Connect Wallet </Styles.AppCardTitle>
            <Styles.AccountBannerShortenedAddress> Wallet not connected </Styles.AccountBannerShortenedAddress>
          </Styles.AccountBannerAddresses>
        )}
        <Styles.AccountBannerRewards>
          <div className="App-card-row">
            <div className="label">Total Volume Traded</div>
            <div> ${formatAmount(userData?.totalTradingVolume, USD_DECIMALS, 2, true)}</div>
          </div>
          <div className="App-card-row">
            <div className="label">Total Rewards</div>
            <div>
              {formatAmount(userData?.totalRewards, ETH_DECIMALS, 4, true)} ETH($
              {formatAmount(totalRewardAmountUsd, ETH_DECIMALS + USD_DECIMALS, 2, true)})
            </div>
          </div>
          <div className="App-card-row">
            <div className="label">Unclaimed Rewards</div>
            <div>
              {formatAmount(userData?.unclaimedRewards, ETH_DECIMALS, 4, true)} ETH($
              {formatAmount(unclaimedRewardsUsd, ETH_DECIMALS + USD_DECIMALS, 2, true)})
            </div>
          </div>
        </Styles.AccountBannerRewards>
      </Styles.AccountBanner>
      <Styles.RewardsData className="App-card">
        <Styles.AppCardTitle>Rewards data</Styles.AppCardTitle>
        <Styles.RewardsWeekSelect>
          {!!allWeeksRewardsData ? (
            <WeekDropdown
              allWeeksRewardsData={allWeeksRewardsData}
              setSelectedWeek={setSelectedWeek}
              rewardsMessage={rewardsMessage}
              trackAction={trackAction}
            />
          ) : null}
          {nextRewards && (
            <Styles.RewardsWeekNextRewards>
              Next rewards in <Styles.RewardsWeekCountdown>{timeTillRewards}</Styles.RewardsWeekCountdown>
            </Styles.RewardsWeekNextRewards>
          )}
        </Styles.RewardsWeekSelect>
        <Styles.RewardsDataBoxes>
          <Styles.RewardsDataBox>
            <Styles.RewardsDataBoxTitle>Volume Traded </Styles.RewardsDataBoxTitle>
            <Styles.LargeText> {`$${formatAmount(userWeekData?.volume, USD_DECIMALS, 2, true)}`}</Styles.LargeText>
          </Styles.RewardsDataBox>
          <Styles.RewardsDataBox className="claimable">
            <Styles.RewardsDataBoxTitle>Claimable Rewards </Styles.RewardsDataBoxTitle>
            <div>
              <Styles.LargeText>{`${formatAmount(userWeekData?.reward, ETH_DECIMALS, 4, true)} ETH`}</Styles.LargeText>
              <span> {` ($${formatAmount(userWeekData?.rewardAmountUsd, ETH_DECIMALS + USD_DECIMALS, 2, true)})`}</span>
            </div>
          </Styles.RewardsDataBox>
        </Styles.RewardsDataBoxes>
        {active && latestWeek && <Styles.RewardsButton disabled className="App-cta large">Week ends in {timeTillRewards}</Styles.RewardsButton>}
        {active && !latestWeek && <Styles.RewardsButton className="App-cta large"> Claim ETH </Styles.RewardsButton>}
        {!active && (
          <Styles.RewardsButton className="App-cta large" onClick={() => connectWallet()}>
            Connect Wallet
          </Styles.RewardsButton>
        )}
      </Styles.RewardsData>
    </Styles.PersonalRewardsContainer>
  );
}