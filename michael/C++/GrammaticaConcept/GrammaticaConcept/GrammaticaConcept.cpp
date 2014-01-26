// GrammaticaConcept.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <string>

using namespace std;

int main() {
	std::string word;
	std::string stem;
	int declChoice;
	char number;

begining:

	cout << "Enter the first principal part of \n a 1st Declention Latin noun or adjective: ";
	cin >> word;
	int pos = word.find_last_of("us") - 1;
	stem = word.substr(0, pos);

	cout << "How would you like this declined? \n";
	cout << "1. Nominative\n";
	cout << "2. Genitive\n";
	cout << "3. Dative\n";
	cout << "4. Accusative\n";
	cout << "5. Ablative\n";
	cout << "6. Vocative\n";
	cout <<	"Enter your choice (1 - 6): ";
	cin >> declChoice;
	cout << "Singular or Plural (s or p): ";
	cin >> number;

	if (declChoice == 1) {
		if (number == 's' || number == 'S')
			cout << stem + "us\n\n";
		else cout << stem + "i\n\n";
	}

	if (declChoice == 2) {
		if (number == 's' || number == 'S')
			cout << stem + "i\n\n";
		else cout << stem + "orum\n\n";
	}

	if (declChoice == 3) {
		if (number == 's' || number == 'S')
			cout << stem + "o\n\n";
		else cout << stem + "is\n\n";
	}

	if (declChoice == 4) {
		if (number == 's' || number == 'S')
			cout << stem + "um\n\n";
		else cout << stem + "os\n\n";
	}

	if (declChoice == 5) {
		if (number == 's' || number == 'S')
			cout << stem + "o\n\n";
		else cout << stem + "is\n\n";
	}

	if (declChoice == 6) {
		if (number == 's' || number == 'S')
			cout << stem + "e\n\n";
		else cout << stem + "i\n\n";
	}

	cout << "Again? (y or n): ";
	char again;
	cin >> again;
	if (again == 'y' || again == 'Y') {
		cout << "\n\n";
		goto begining;
	}

	system("pause");
	return 0;
}

