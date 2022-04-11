// Week 1

// XOR Strings 2
// Given two strings consisting of digits 0 and 1 only, find the XOR of the two strings.
string strings_xor(string s, string t) {

    string res = "";
    for(int i = 0; i < s.size(); i++) {
        if(s[i] == t[i])
            res += '0';
        else
            res += '1';
    }

    return res;
}


// Week 2

// Zig Zag Sequence
// 1 2 3 4 5 6 7 => 1 2 3 7 6 5 4
void findZigZagSequence(vector < int > a, int n){
    sort(a.begin(), a.end());
    int mid = (n + 1)/2 - 1;
    swap(a[mid], a[n-1]);

    int st = mid + 1;
    int ed = n - 2;
    while(st <= ed){
        swap(a[st], a[ed]);
        st = st + 1;
        ed = ed - 1;
    }
    for(int i = 0; i < n; i++){
        if(i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
}

// Prime Dates
// To see if a date is lucky,
// Firstly, sequentially concatinate the date, month and year, into a new integer x erasing the leading zeroes.
// Now if x is divisible by either 4 or 7, then we call the date a lucky date.

int month[15];

void updateLeapYear(int year) {
    if(year % 400 == 0) {
        month[2] = 29;
    } else if(year % 100 == 0) {
        month[2] = 28;
    } else if(year % 4 == 0) {
        month[2] = 29;
    } else {
        month[2] = 28;
    }
}

void storeMonth() {
    month[1] = 31;
    month[2] = 28;
    month[3] = 31;
    month[4] = 30;
    month[5] = 31;
    month[6] = 30;
    month[7] = 31;
    month[8] = 31;
    month[9] = 30;
    month[10] = 31;
    month[11] = 30;
    month[12] = 31;
}

int findLuckyDates(int d1, int m1, int y1, int d2, int m2, int y2) {
    storeMonth();

    int result = 0;

    while(true) {
        int x = d1;
        x = x * 100 + m1;
        x = x * 10000 + y1;
        if(x % 4 == 0 || x % 7 == 0) {
            result = result + 1;
        }
        if(d1 == d2 && m1 == m2 && y1 == y2) {
            break;
        }
        updateLeapYear(y1);
        d1 = d1 + 1;
        if(d1 > month[m1]) {
            m1 = m1 + 1;
            d1 = 1;
            if(m1 > 12) {
                y1 =  y1 + 1;
                m1 = 1;
            }
        }
    }
    return result;
}