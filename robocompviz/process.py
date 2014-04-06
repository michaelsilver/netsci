import csv

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

maxRedScoreEver = 0
maxBlueScoreEver = 0
redWins = 0
blueWins = 0
winsByRobot = {}
pointsByRobot = {}
def incrementDict(dict_, key, amount=1):
	if not key in dict_:
		dict_[key] = 0

	dict_[key] += amount

for competition in competitions:
	maxRedScoreEver = max(competition['redscore'], maxRedScoreEver)
	maxBlueScoreEver = max(competition['bluescore'], maxBlueScoreEver)
	
	if competition['winner'] == 'Red':
		redWins += 1
		winner1 = competition['red1']
		winner2 = competition['red2'] 
	else:
		blueWins += 1
		winner1 = competition['blue1']
		winner2 = competition['blue2']

	incrementDict(winsByRobot, winner1)
	incrementDict(winsByRobot, winner2)

print redWins
print blueWins

winsByRobotSorted = winsByRobot.items()
winsByRobotSorted.sort(key=lambda x:x[1], reverse=True)
print '\n'.join([str(item) for item in winsByRobotSorted])

print maxRedScoreEver
print maxBlueScoreEver