import csv

#utility functions
def readCSV(fileName):
	with(open(fileName, 'U')) as file_:
		data = csv.reader(file_)
		data = [row for row in data]
		headers = data[0]
		ret = []
		for row in data[1:]:
			retRow = {}
			for header, cell in zip(headers, row):
				retRow[header] = cell
			ret.append(retRow)
		return ret

def incrementDict(dict_, key, amount=1):
	if not key in dict_:
		dict_[key] = 0

	dict_[key] += amount

#data structures

#division
#round
#instance
#matchnum
#red1
#red2
#red3
#blue1
#blue2
#blue3
#redscore
#bluescore
#redsit
#bluesit
#scored
#winner
competitions = readCSV('competitions.csv')
#rank
#teamnum
#teamname
#wins
#losses
#ties
#wp
#sp
rankings = readCSV('rankings.csv')

#accumulation variables
maxRedScoreEver = 0
maxBlueScoreEver = 0
minRedScoreEver = 0
minBlueScoreEver = 0
maxScoreEver = 0
minScoreEver = 0
redPoints = 0
bluePoints = 0
allPoints = 0
redAvg =0
blueAvg = 0
allAvg = 0
redWins = 0
blueWins = 0
winsByRobot = {}
lossesByRobot = {}
pointsByRobot = {}

for competition in competitions:
	maxRedScoreEver = max(competition['redscore'], maxRedScoreEver)
	maxBlueScoreEver = max(competition['bluescore'], maxBlueScoreEver)

	minRedScoreEver = min(competition['redscore'], minRedScoreEver)
	minBlueScoreEver = min(competition['bluescore'], minBlueScoreEver)

	maxScoreEver = max(competition['redscore'], competition['bluescore'], maxScoreEver)
	minScoreEver = min(competition['redscore'], competition['bluescore'], minScoreEver)

	"""
	redPoints += competition['redscore']
	bluePoints += competition['bluescore']
	allPoints = redPoints + bluePoints
	"""

	if competition['winner'] == 'Red':
		redWins += 1
		winner1 = competition['red1']
		winner2 = competition['red2']
		loser1 = competition['blue1']
		loser2 = competition['blue2']
	else:
		blueWins += 1
		winner1 = competition['blue1']
		winner2 = competition['blue2']
		loser1 = competition['red1']
		loser2 = competition['red2']

	incrementDict(winsByRobot, winner1)
	incrementDict(winsByRobot, winner2)
	incrementDict(lossesByRobot, loser1)
	incrementDict(lossesByRobot, loser2)

"""
redAvg = redPoints/len(competitions)
blueAvg = bluePoints/len(competitions)
allAvg = allPoints/len(competitions)
"""

#print computations
print 'redWins:', redWins
print 'blueWins', blueWins
print 'maxRedScoreEver:', maxRedScoreEver
print 'maxBlueScoreEver:', maxBlueScoreEver
print 'minRedScoreEver', minRedScoreEver
print 'minBlueScoreEver', minBlueScoreEver
print 'maxScoreEver', maxScoreEver
print 'minScoreEver', minScoreEver
print 'redAvg', redAvg
print 'blueAvg', blueAvg
print 'allAvg', allAvg

winsByRobotSorted = winsByRobot.items()
winsByRobotSorted.sort(key=lambda x:x[1], reverse=True)
print ''
print 'ROBOT NAME, WINS'
print '----------'
print '\n'.join([str(item) for item in winsByRobotSorted])

lossesByRobotSorted = lossesByRobot.items()
lossesByRobotSorted.sort(key=lambda x:x[1], reverse=True)
print ''
print 'ROBOT NAME, LOSSES'
print '----------'
print '\n'.join([str(item) for item in lossesByRobotSorted])
