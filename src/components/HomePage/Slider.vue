<template>
  <div class="container">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../assets/img/vs.svg" class="d-block w-100" alt="">
          <div class="carousel-caption d-none d-md-block">
            <h4>Choose Your Camp</h4>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../../assets/img/mvs.svg" class="d-block w-100" alt="">
          <div class="carousel-caption d-none d-md-block">
            <h4>Marvel</h4>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../../assets/img/dvs.svg" class="d-block w-100" alt="">
          <div class="carousel-caption d-none d-md-block">
            <h4>DC</h4>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/_homepage.scss';

p {
  margin: 0;
}
.choose-camp {
  text-align: center;
}
.camp {
  display: flex;
  justify-content: center;
}
.camp-marvel li {
  background-color: #f4f4f4;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, .2);
}

</style>
