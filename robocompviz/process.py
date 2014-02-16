import csv

def readCSV(fileName):
	with(open(fileName)) as file_:
		data = csv.reader(file_)
		data = [row for row in data]
		headers = data[0]
		print headers
		ret = []
		for row in data[1:]:
			retRow = {}
			for header, cell in zip(headers, row):
				retRow[header] = cell
			ret.append(retRow)
		return ret

competitions = readCSV('competitions.csv')
rankings = readCSV('rankings.csv')

maxRedScoreEver = 0
maxBlueScoreEver = 100
for competition in competitions:
	maxRedScoreEver = max(competition['redscore'], maxRedScoreEver)
	maxBlueScoreEver = max(competition['bluescore'], maxBlueScoreEver)

print maxRedScoreEver
print maxBlueScoreEver