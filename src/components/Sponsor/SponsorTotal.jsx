import { useState, useEffect } from "react";

const SponsorTotal = ({ totalList }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let currentAmount = 0;
    let animationFrameId;

    const startAnimation = (timestamp) => {
      if (!currentAmount) currentAmount = 0;
      if (!timestamp) timestamp = performance.now();

      const elapsed = timestamp - start;
      const duration = 2000; // 2 seconds
      const progress = elapsed / duration;

      const amount = Math.round(
        totalList.reduce((acc, item) => acc + parseInt(item.spon_money), 0) *
          progress
      );

      setTotalAmount(amount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(startAnimation);
      } else {
        setTotalAmount(
          totalList.reduce((acc, item) => acc + parseInt(item.spon_money), 0)
        );
      }
    };

    const start = performance.now();
    animationFrameId = requestAnimationFrame(startAnimation);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalList]);

  return (
    <>
      <div className="page-header">
        <p className="sponComment">
          <strong className="totalList">{`${totalList.length}`}</strong>명의
          기부자님이{" "}
          <strong className="totalList">{totalAmount.toLocaleString()}</strong>
          원 후원해주셨습니다
        </p>
      </div>
    </>
  );
};

export default SponsorTotal
