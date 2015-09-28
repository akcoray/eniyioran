function coupon($http){
	var cpn = {};
	cpn.bets = [];
	cpn.multiplier = 1;
	cpn.totalRate = 0;
	cpn.totalAmount = 0;

	cpn.add = function(match, betType)
	{
		if(cpn.bets.filter(function(item) { return item.match.id === match.id; }).length == 0)
		{
			cpn.bets.push({ match : match, betType : betType });
		}
	};

	cpn.remove = function(matchId)
	{
		var index = cpn.bets.map(function(e) { return e.match.id; }).indexOf(matchId);
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