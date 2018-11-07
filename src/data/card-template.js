export default 
`<div class="card">
    <div class="card__header">
        <div class="card__image" style="background-image: url(assets/images/workouts/{image})"></div>     
        <div class="card__title-box">
            <h3 class="card__title">{name}</h3>
            <div class="card__star card__star--{difficulty}">
                <svg>
                    <use xlink:href="./assets/images/sprite.svg#icon-lift"></use>
                </svg>
                <svg>
                    <use xlink:href="./assets/images/sprite.svg#icon-lift"></use>
                </svg>
                <svg>
                    <use xlink:href="./assets/images/sprite.svg#icon-lift"></use>
                </svg>
            </div>
        </div>
    </div>
    <div class="card__content">
        <h4 class="card__round-title">Rounds</h4>
        <ul class="card__rounds">
            {rounds}
        </ul>
    </div>
    <ul class="card__footer card__footer--{type}">
        <li>{typeName}</li>
        <li>
            <svg>
                <use xlink:href="./assets/images/sprite.svg#icon-clock"></use>
            </svg>
            <div>{duration} min</div>
        </li>
        <li>
            <svg>
                <use xlink:href="./assets/images/sprite.svg#icon-trophy"></use>
            </svg>
            <div>{best}</div>
            <span class="card__tooltip">{notes}</span>
        </li> 
    </ul>
</div>`;