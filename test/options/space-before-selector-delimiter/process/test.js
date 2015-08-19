describe.skip('options/space-before-selector-delimiter:', function() {
    describe('process', function() {
        it('Array value => should not change anything', function() {
            this.comb.configure({ 'space-before-selector-delimiter': ['', ' '] });
            return this.shouldBeEqual('test.css');
        });

        it('Invalid string value => should not change anything', function() {
            this.comb.configure({ 'space-before-selector-delimiter': '  nani  ' });
            return this.shouldBeEqual('test.css');
        });

        it('Float number value => should not change anything', function() {
            this.comb.configure({ 'space-before-selector-delimiter': 3.5 });
            return this.shouldBeEqual('test.css');
        });

        it('Integer value => should set proper space before selector delimiter', function() {
            this.comb.configure({ 'space-before-selector-delimiter': 0 });
            return this.shouldBeEqual('test.css', 'test.expected.css');
        });

        it('Valid string value (spaces only) => should set proper space before selector delimiter', function() {
            this.comb.configure({ 'space-before-selector-delimiter': '  ' });
            return this.shouldBeEqual('test.css', 'test-2.expected.css');
        });

        it('Valid string value (spaces and newlines) => should set proper space before selector delimiter', function() {
            this.comb.configure({ 'space-before-selector-delimiter': '\n    ' });
            return this.shouldBeEqual('test.css', 'test-3.expected.css');
        });
    });

    describe('detect', function() {
        it('Should detect no whitespace', function() {
            this.shouldDetect(
                ['space-before-selector-delimiter'],
                'a,b{top:0}',
                { 'space-before-selector-delimiter': '' }
            );
        });

        it('Should detect whitespace', function() {
            this.shouldDetect(
                ['space-before-selector-delimiter'],
                'a \n ,b {top:0}',
                { 'space-before-selector-delimiter': ' \n ' }
            );
        });

        it('Should detect no whitespace (2 blocks)', function() {
            this.shouldDetect(
                ['space-before-selector-delimiter'],
                'a,b{top:0} a ,b{left:0}',
                { 'space-before-selector-delimiter': '' }
            );
        });

        it('Should detect whitespace (2 blocks)', function() {
            this.shouldDetect(
                ['space-before-selector-delimiter'],
                'a ,b {top:0} b,a{left:0}',
                { 'space-before-selector-delimiter': ' ' }
            );
        });

        it('Should detect no whitespace (3 blocks)', function() {
            this.shouldDetect(
                ['space-before-selector-delimiter'],
                'a ,b{top:0} b,c{left:0} c,d{right:0}',
                { 'space-before-selector-delimiter': '' }
            );
        });

        it('Should detect whitespace (3 blocks)', function() {
            this.shouldDetect(
                ['space-before-selector-delimiter'],
                'a,b{top:0} b ,c{left:0} c ,d{right:0}',
                { 'space-before-selector-delimiter': ' ' }
            );
        });
    });
});