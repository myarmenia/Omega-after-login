import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import GamesList from './gamesList';
import { connect } from 'react-redux';
import '../../styles/3Ddropdown.css';
import $ from 'jquery';


let url = require(`../../images/lock.png`);

let obj1={};
let obj2={};
class CurrentCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentCourse:'',
            videoLink:'',
            openVideo: false,
            noLink:true,
            playGame: false,
            gametype:'',
            img:[],
            lessons:'',
            courseLevel:'',
            count:''
        }
    }

    playGame = () => {
        this.setState({
            openVideo: false,playGame: true
        });
        this.props.gotogamelist(0)
    };

    changeState =(e)=>{
             this.setState({
            openVideo: e,
            playGame:e,
                 })
       //
         }
    replayVideo =(e)=>{
        this.setState({
            openVideo: e,
                noLink:e,
            playGame:!e

        })
       }

    goBack = () =>{
        this.setState({
            openVideo: false,
            noLink:false,
       })

    };
    goBackToLesson = (e) =>{
        let oper=2;
        let Unlock_NextLessons = `unique_id=${encodeURI(this.props.userProfile.uid)}&operation=${encodeURI(oper)}&course_name=${encodeURI(this.state.currentCourse)}`;
   // console.log(Unlock_NextLessons, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: Unlock_NextLessons
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
            let  count=response.length*1;
          console.log(response, "response lockLessons");
            //  console.log(count, "count lockLessons");
            // console.log(this.state.locker_count, "this.state.locker_countthis.state.locker_count");

            if (count > this.state.count) {
                this.props.countForlock(count);
            }



        }).catch(error => {
            console.log(error);
        });
        this.setState({
            openVideo: e,
            playGame:e,
       })
/*if (this.state.count!==this.props.lock){
    this.props.countForlock(this.props.lock+1)
}*/

    };

  getVideoLink =(e)=> {
        this.setState({
            courseLevel:e.target.id
        })
        let info1 = `level=${encodeURI(e.target.id)}&course_id=${encodeURI(this.state.currentCourseID)}`;
       console.log(info1,"info1");
        fetch(`https://omegacoding.com/android_test/index.php`,{
            method:'POST',
            headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
            body: info1
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(response => {
              obj1=response;
     console.log(obj1, "obj1");
            if (response.video_link){
                this.setState({openVideo:true, noLink:true, videoLink: response.video_link});
            }
           else if (response.video_link === null ){
                this.setState({noLink: false, openVideo: true})
            }
        }).catch(error => {
                console.log(error);
            });
        let oper=4;
        let info2 = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${encodeURI(e.target.id)}&operation=${oper}&course_name=${this.state.currentCourse==='BootStrap'?'bootstrap':this.state.currentCourse}`;
        //console.log(info2, "-info2");
        fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
         method:'POST',
         headers:{"Content-type":"application/x-www-form-urlencoded",'Accept':'application/json'},
         body: info2
         }).then(response => {
         if(response.ok){
         return response.json();
         }
         }).then(response => {
           obj2=response;
           //console.log(obj2, "obj2");
         if (response.video_link){
         this.setState({openVideo:true, noLink:true, videoLink: response.video_link});
         }
         else if (response.video_link === null ){
         this.setState({noLink: false, openVideo: true})
         }
         }).catch(error => {
         console.log(error);
         });
    };
    componentWillMount(){
        this.setState({
            currentCourseID:this.props.courseID,
            lessons: this.props.obj,
            currentCourse:this.props.data,
            count:this.props.lock,
        });

    }

    componentWillReceiveProps(props){
        this.setState({
            currentCourseID: props.courseID,
            lessons: props.obj,
            currentCourse:props.data,
            count:props.lock,


        });

    }
    render(){
       // console.log(  this.props.count,"    this.props.count");
       // console.log(  this.state.count,"    this.state.count");
       // console.log(  this.props.data,"    datadatadatadatadata ")
       // console.log(this.props.lock,"this.props.lockthis.props.lock")
        let formap=[];
        let max_points_obj={};
        let f=0;
        //let newmasiv=[];
        //let p=0;
        for( let i in obj1) {
            let obj_n;
            if (i ==='game1'|| i ==='game2'|| i ==='game3' || i ==='game4'){
                formap[f]=obj1[i];
                obj_n = obj1[i].game_id;
                max_points_obj[obj_n]=obj1[i].max_points
                f++;

            }
        }

      //console.log(  formap,"formapformapformap")
       // console.log(  max_points_obj,"max_points_objmax_points_obj")

        for( let i in obj2) {
            if (i ==='game1'){
                formap[0].mark=obj2[i].mark;
                formap[0].points=obj2[i].points;
            }

            if (i ==='game2'){
                formap[1].mark=obj2[i].mark;
                formap[1].points=obj2[i].points;
            }
            if (i ==='game3'){
                formap[2].mark=obj2[i].mark;
                formap[2].points=obj2[i].points;
            }
            if (i ==='game4'){
                formap[3].mark=obj2[i].mark;
                formap[3].points=obj2[i].points;
            }
        }
      //  console.log(  formap,"formapformapformap111")
        let newArray={...this.state.lessons};
        let newArray1 = Object.keys(newArray).map(function (key) { return newArray[key]; });
        newArray1.shift();
        let i=0;
  let courses = newArray1.map((item, index) => {
      i++;
                        return (
                                <dd key={index}><a className="leftik" href="#" id={item.id} onClick={i<=this.props.lock?this.getVideoLink:''}>
                                    {i+'. ' }
                                    {' '+ item.description+' '} { i>this.props.lock &&
                                <img src={url}  width="22" alt="lock" />

                                } </a>

      </dd>
            );
        });

		/* -- youtube -old-url ----
		<ReactPlayer url={`https://www.youtube.com/watch?v=${this.state.videoLink}`} playing  style={{padding:'23px'}} controls   /> */
        return(
            <div className="levelsContainer" style={{left:!this.state.openVideo ?"22%":""}}>
                {
                    (!this.state.openVideo&&!this.state.playGame) &&
                    <div className="courseTable " >
                        <section className="demo">
                        <dl className="list maki">
                            <dt>{this.state.currentCourse}</dt>
                        {courses}
                        </dl>
                    </section>
                     {/*   <a href="#" className="toggle">Toggle</a>*/}
                    </div>
                }
                {(this.state.openVideo && this.state.noLink)&&
                    <div className="videoContainer">
                <ReactPlayer url={`https://www.youtube.com/embed/${this.state.videoLink}`} playing  style={{padding:'23px'}} controls   />
                        <figure id="online">
                            <div className="front">
                                <h3>MORE</h3>
                            </div>
                            <div className="back" onClick={this.playGame}>
                                <a href="#">start game</a>
                            </div>
                        </figure>
                    <div className="btn_back">
                        <button className="button_blue_back" onClick={this.goBack} title="Go Back">Go Back
                        </button>
                    </div>
                    </div>

                }
                {
                    !this.state.noLink &&
                        <h4 style={{color:'#EE3745'}}> There is NO video for this level!! </h4>
                }

                {this.state.playGame &&

                    <GamesList  level_ID={this.state.courseLevel} course_Data={this.state.currentCourseID} courseName={this.state.currentCourse} img={formap}
                                toShow={this.changeState} replVideo={this.replayVideo} backToLevel={this.goBackToLesson} 
                                videoLink = {this.state.videoLink} reload_data={this.reload_data} max_points={max_points_obj}/>
                }
            </div>
        )
    }
    componentDidMount(){


            var time=1;
            // Global initialisation flag
            var initialized = false;

            // For detecting browser prefix and capabilities
            var el = document.createElement( 'div' );
            var re = /^(Moz|(w|W)ebkit|O|ms)(?=[A-Z])/;

            // Establish vendor prefix and CSS 3D support
            var vendor = (function() { for ( var p in el.style ) if( re.test(p) ) return p.match(re)[0]; })() || '';
            var canRun = vendor + 'Perspective' in el.style;
            var prefix = '-' + vendor.toLowerCase() + '-';

            var $this, $root, $base, $kids, $node, $item, $over, $back;
            var wait, anim, last;

            // Public API
            var api = {

                // Toggle open / closed
                toggle: function() {

                    $this = $( this );
                    $this.makisu( $this.hasClass( 'open' ) ? 'close' : 'open' );
                },

                // Trigger the unfold animation
                open: function( speed, overlap, easing ) {

                    // Cache DOM references
                    $this = $(this);
                    $root = $this.find( '.root' );
                    $kids = $this.find( '.node' ).not( $root );

                    // Establish values or fallbacks
                    speed = utils.resolve( $this, 'speed', speed );
                    easing = utils.resolve( $this, 'easing', easing );
                    overlap = utils.resolve( $this, 'overlap', overlap );

                    $kids.each( function( index, el ) {

                        // Establish settings for this iteration
                        anim = 'unfold' + ( !index ? '-first' : '' );
                        last = index === $kids.length - 1;

                        time = speed * ( 1 - overlap );
                        wait = index * time;

                        // Cache DOM references
                        $item = $( el );
                        $over = $item.find( '.over' );

                        // Element animation
                        $item.css(utils.prefix({
                            'transform': 'rotateX(180deg)',
                            'animation': anim + ' ' + speed + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                        }));

                        // Shading animation happens when the next item starts
                        if ( !last ) wait = ( index + 1 ) * time;

                        // Shading animation
                        $over.css(utils.prefix({
                            'animation': 'unfold-over ' + (speed * 0.45) + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                        }));
                    });

                    // Add momentum to the container
                    $root.css(utils.prefix({
                        'animation': 'swing-out ' + ( $kids.length * time * 1.4 ) + 's ease-in-out 0s 1 normal forwards'
                    }));

                    $this.addClass( 'open' );
                },

                // Trigger the fold animation
                close: function( speed, overlap, easing ) {

                    // Cache DOM references
                    $this = $(this);
                    $root = $this.find( '.root' );
                    $kids = $this.find( '.node' ).not( $root );

                    // Establish values or fallbacks
                    speed = utils.resolve( $this, 'speed', speed ) * 0.66;
                    easing = utils.resolve( $this, 'easing', easing );
                    overlap = utils.resolve( $this, 'overlap', overlap );

                    $kids.each( function( index, el ) {

                        // Establish settings for this iteration
                        anim = 'fold' + ( !index ? '-first' : '' );
                        last = index === 0;
                        time = speed * ( 1 - overlap );
                        wait = ( $kids.length - index - 1 ) * time;

                        // Cache DOM references
                        $item = $( el );
                        $over = $item.find( '.over' );

                        // Element animation
                        $item.css(utils.prefix({
                            'transform': 'rotateX(0deg)',
                            'animation': anim + ' ' + speed + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                        }));

                        // Adjust delay for shading
                        if ( !last ) wait = ( ( $kids.length - index - 2 ) * time ) + ( speed * 0.35 );

                        // Shading animation
                        $over.css(utils.prefix({
                            'animation': 'fold-over ' + (speed * 0.45) + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                        }));
                    });

                    // Add momentum to the container
                    $root.css(utils.prefix({
                        'animation': 'swing-in ' + ( $kids.length * time * 1.0 ) + 's ease-in-out 0s 1 normal forwards'
                    }));

                    $this.removeClass( 'open' );
                }
            };

            // Utils
            var utils = {

                // Resolves argument values to defaults
                resolve: function( $el, key, val ) {
                    return typeof val === 'undefined' ? $el.data( key ) : val;
                },

                // Prefixes a hash of styles with the current vendor
                prefix: function( style ) {

                    for ( var key in style ) {
                        style[ prefix + key ] = style[ key ];
                    }

                    return style;
                },

                // Inserts rules into the document styles
                inject: function( rule ) {

                    try {

                        var style = document.createElement( 'style' );
                        style.innerHTML = rule;
                        document.getElementsByTagName( 'head' )[0].appendChild( style );

                    } catch ( error ) {}
                }
            };

            // Element templates
            var markup = {
                node: '<span class="node"/>',
                back: '<span class="face back"/>',
                over: '<span class="face over"/>'
            };

            // Plugin definition
            $.fn.makisu = function( options ) {

                // Notify if 3D isn't available
                if ( !canRun ) {

                    var message = 'Failed to detect CSS 3D support';

                    if( console && console.warn ) {

                        // Print warning to the console
                       //console.warn( message );

                        // Trigger errors on elements
                        this.each( function() {
                            $( this ).trigger( 'error', message );
                        });
                    }

                    return;
                }

                // Fires only once
                if ( !initialized ) {

                    initialized = true;

                    // Unfold
                    utils.inject( '@' + prefix + 'keyframes unfold        {' +

                        '0%   {' + prefix + 'transform: rotateX(180deg);  }' +
                        '50%  {' + prefix + 'transform: rotateX(-30deg);  }' +
                        '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                        '}');

                    // Unfold (first item)
                    utils.inject( '@' + prefix + 'keyframes unfold-first  {' +

                        '0%   {' + prefix + 'transform: rotateX(-90deg);  }' +
                        '50%  {' + prefix + 'transform: rotateX(60deg);   }' +
                        '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                        '}');

                    // Fold
                    utils.inject( '@' + prefix + 'keyframes fold          {' +

                        '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                        '100% {' + prefix + 'transform: rotateX(180deg);  }' +

                        '}');

                    // Fold (first item)
                    utils.inject( '@' + prefix + 'keyframes fold-first    {' +

                        '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                        '100% {' + prefix + 'transform: rotateX(-180deg); }' +

                        '}');

                    // Swing out
                    utils.inject( '@' + prefix + 'keyframes swing-out     {' +

                        '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                        '30%  {' + prefix + 'transform: rotateX(-30deg);  }' +
                        '60%  {' + prefix + 'transform: rotateX(15deg);   }' +
                        '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                        '}');

                    // Swing in
                    utils.inject( '@' + prefix + 'keyframes swing-in      {' +

                        '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                        '50%  {' + prefix + 'transform: rotateX(-10deg);  }' +
                        '90%  {' + prefix + 'transform: rotateX(15deg);   }' +
                        '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                        '}');

                    // Shading (unfold)
                    utils.inject( '@' + prefix + 'keyframes unfold-over   {' +
                        '0%   { opacity: 1.0; }' +
                        '100% { opacity: 0.0; }' +
                        '}');

                    // Shading (fold)
                    utils.inject( '@' + prefix + 'keyframes fold-over     {' +
                        '0%   { opacity: 0.0; }' +
                        '100% { opacity: 1.0; }' +
                        '}');

                    // Node styles
                    utils.inject( '.node {' +
                        'position: relative;' +
                        'display: block;' +
                        '}');

                    // Face styles
                    utils.inject( '.face {' +
                        'pointer-events: none;' +
                        'position: absolute;' +
                        'display: block;' +
                        'height: 100%;' +
                        'width: 100%;' +
                        'left: 0;' +
                        'top: 0;' +
                        '}');
                }

                // Merge options & defaults
                var opts = $.extend( {}, $.fn.makisu.defaults, options );

                // Extract api method arguments
                var args = Array.prototype.slice.call( arguments, 1 );

                // Main plugin loop
                return this.each( function () {

                    // If the user is calling a method...
                    if ( api[ options ] ) {
                        return api[ options ].apply( this, args );
                    }

                    // Store options in view
                    $this = $( this ).data( opts );

                    // Only proceed if the scene hierarchy isn't already built
                    if ( !$this.data( 'initialized' ) ) {

                        $this.data( 'initialized', true );

                        // Select the first level of matching child elements
                        $kids = $this.children( opts.selector );

                        // Build a scene graph for elements
                        $root = $( markup.node ).addClass( 'root' );
                        $base = $root;

                        // Process each element and insert into hierarchy
                        $kids.each( function( index, el ) {

                            $item = $( el );

                            // Which animation should this node use?
                            anim = 'fold' + ( !index ? '-first' : '' );

                            // Since we're adding absolutely positioned children
                            $item.css( 'position', 'relative' );

                            // Give the item some depth to avoid clipping artefacts
                            $item.css(utils.prefix({
                                'transform-style': 'preserve-3d',
                                'transform': 'translateZ(-0.1px)'
                            }));

                            // Create back face
                            $back = $( markup.back );
                            $back.css( 'background', $item.css( 'background' ) );
                            $back.css(utils.prefix({ 'transform': 'translateZ(-0.1px)' }));

                            // Create shading
                            $over = $( markup.over );
                            $over.css(utils.prefix({ 'transform': 'translateZ(0.1px)' }));
                            $over.css({
                                'background': opts.shading,
                                'opacity': 0.0
                            });

                            // Begin folded
                            $node = $( markup.node ).append( $item );
                            $node.css(utils.prefix({
                                'transform-origin': '50% 0%',
                                'transform-style': 'preserve-3d',
                                'animation': anim + ' 1ms linear 0s 1 normal forwards'
                            }));

                            // Build display list
                            $item.append( $over );
                            $item.append( $back );
                            $base.append( $node );

                            // Use as parent in next iteration
                            $base = $node;
                        });

                        // Set root transform settings
                        $root.css(utils.prefix({
                            'transform-origin': '50% 0%',
                            'transform-style': 'preserve-3d'
                        }));

                        // Apply perspective
                        $this.css(utils.prefix({
                            'transform': 'perspective(' + opts.perspective + 'px)'
                        }));

                        // Display the scene
                        $this.append( $root );
                    }
                });
            };

            // Default options
            $.fn.makisu.defaults = {

                // Perspective to apply to rotating elements
                perspective: 1200,

                // Default shading to apply (null => no shading)
                shading: 'rgba(0,0,0,0.12)',

                // Area of rotation (fraction or pixel value)
                selector: null,

                // Fraction of speed (0-1)
                overlap: 0.6,

                // Duration per element
                speed: 0.8,

                // Animation curve
                easing: 'ease-in-out'
            };

            $.fn.makisu.enabled = canRun;



// The `enabled` flag will be `false` if CSS 3D isn't available

        if ( $.fn.makisu.enabled ) {

            var $sashimi = $( '.sashimi' );
            var $nigiri = $( '.nigiri' );
            var $maki = $( '.maki' );

            // Create Makisus

            $nigiri.makisu({
                selector: 'dd',
                overlap: 0.85,
                speed: 1.7
            });

            $maki.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.85
            });

            $sashimi.makisu({
                selector: 'dd',
                overlap: 0.2,
                speed: 0.5
            });

            // Open all

            $( '.list' ).makisu( 'open' );

            // Toggle on click

            $( '.toggle' ).on( 'click', function() {
                $( '.list' ).makisu( 'toggle' );
            });

            // Disable all links

            $( '.demo a' ).click( function( event ) {
                event.preventDefault();
            });

        } else {

            $( '.warning' ).show();
        }
	}

            

}


const store = state => ({
    gameList : state.gamelist,
    replay:state.replayGame,
    userProfile: state.userProfileData,
    lock: state.videolockercount,



});

const dispatch = dispatch => ({
    gotogamelist: tabIndex => dispatch({type:'GOTO_GAMELIST', payload: tabIndex }),
    countForlock:  count => dispatch({type:'OPEN_CLOSE_LESSONS', payload: count }),


});

export default connect(
    store,
    dispatch
)(CurrentCourse)

