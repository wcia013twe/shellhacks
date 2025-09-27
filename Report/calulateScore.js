function calculateAttentionScore(
  desiredAttention,
  actualTimeOnComponent,
  totalTestTime
) {
  const actualAttention = (actualTimeOnComponent / totalTestTime) * 100;
  const attentionGap = desiredAttention - actualAttention;

  const distractionScore = attentionGap;

  return {
    score: distractionScore,
    desiredAttention: desiredAttention,
    actualAttention: actualAttention.toFixed(2),
  };
}
