function coupon($http){
	var cpn = {};
	cpn.bets = [];
	cpn.multiplier = 1;
	cpn.totalRate = 0;
	cpn.totalAmount = 0;

	cpn.add = function(matchId, betType)
	{
		if(cpn.bets.filter(function(item) { return item.matchId === matchId; }).length == 0)
		{
			cpn.bets.push({ matchId : matchId, betType : betType });
		}
	};

	cpn.remove = function(matchId)
	{
		var index = cpn.bets.map(function(e) { return e.matchId; }).indexOf(matchId);
		if(index > -1)
		{
			cpn.bets.splice(index, 1);
		}
	}

	cpn.calculate = function()
	{

	}

	return cpn;
}