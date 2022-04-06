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