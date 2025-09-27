function calculateAttentionScore(
  desiredAttention,
  actualTimeOnComponent,
  totalTestTime
) {
  const actualAttention = (actualTimeOnComponent / totalTestTime) * 100;
  const attentionGap = actualAttention - desiredAttention;

  const distractionScore = attentionGap;
  //   if distractionScore < 0, means the component got less attention than desired (unnoticed)
  //   if distractionScore > 0, means the component got more attention than desired (distraction)
  //   if distractionScore == 0, means optimal attention

  return {
    score: distractionScore,
    desiredAttention: desiredAttention,
    actualAttention: actualAttention.toFixed(2),
  };
}
