<template>
<el-container >
  <el-header>  <img :src="imgUrl" class="imgSize"> <div class="words">个人财务管理系统</div></el-header>

    <el-container>
    <el-aside width="200px">
       <el-row class="tac">
        <el-col :span="12">
          
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#dadada"
            text-color="#fff"
            active-text-color="#409eff"  @select="changetableMethod">
            <el-menu-item index="1">
              <i class="el-icon-setting"></i>
              <span slot="title">账号管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">收入管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">支出管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-search"></i>
              <span slot="title">理财统计</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-search"></i>
              <span slot="title">图表展示</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        
        </el-row>
    </el-aside>
    <el-main>
     
       <div class="account" v-if="account"> 
         <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
          </el-breadcrumb>
          <el-table
          :data="tableData1"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        
          >
          <el-table-column
            label="姓名"
            width="180">
           <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.name" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
            </template>
          </el-table-column>
          <el-table-column
            label="账号"
            width="180">
            <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.account" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
            </template>
          </el-table-column>
          <el-table-column
           
            label="密码"
            width="180">
            <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.password" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
            </template>
          </el-table-column>
          <el-table-column
        
            label="地址">
            <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.address" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
            </template>
          </el-table-column>
          <el-table-column
           
            label="创建日期或修改日期"
            width="180">
            <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.disable">编辑</el-button>
                 <el-button
                size="mini"
                @click="handleSave(scope.$index, scope.row)" v-if="!scope.row.disable" type="primary">保存</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

            
      </div>
 
        <div class="income" v-if="income">
           <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>收入管理</el-breadcrumb-item>
          </el-breadcrumb>
           <el-button  icon="el-icon-circle-plus" round @click="incomeAdd(1)">添加</el-button>
          <el-table
          :data="tableData2"
          style="width: 100%">
            <el-table-column
              label="日期"
              width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="180">
             <template slot-scope="scope">
                 <i class="el-icon-star-off"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                 
              </template>
            </el-table-column>
             <el-table-column
              label="收入金额"
              width="180">
             <template slot-scope="scope">
                
                  <el-input size="small" type='number' v-model="scope.row.money" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
              </template>
            </el-table-column>
             <el-table-column
              label="收入来源或者收入理由"
              width="280">
             <template slot-scope="scope">
                
                  <el-input size="small" v-model="scope.row.source" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
              </template>
            </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.disable">编辑</el-button>
                 <el-button
                size="mini"
                @click="handleSave(scope.$index, scope.row)" v-if="!scope.row.disable" type="primary">保存</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
        </div>
        <div class="expenditure" v-if="expenditure">
             <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>支出管理</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button  icon="el-icon-circle-plus" round @click="incomeAdd(2)">添加</el-button>
          <el-table
            :data="tableData3"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          
            >
            <el-table-column
            
              label="日期"
              width="180">
              <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>

            <el-table-column
            
              label="姓名"
              width="180">
            <template slot-scope="scope">
                       <i class="el-icon-star-off"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
          
              label="消费金额">
              <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.money" placeholder="请输入消费金额" :disabled="scope.row.disable"></el-input> 
              </template>
            </el-table-column>
            <el-table-column
          
              label="消费地址或消费原因">
              <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.consumerAddress" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
              </template>
            </el-table-column>
  
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.disable">编辑</el-button>
                  <el-button
                  size="mini"
                  @click="handleSave(scope.$index, scope.row)" v-if="!scope.row.disable" type="primary">保存</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="statistical" v-if="statistical">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>理财统计</el-breadcrumb-item>
          </el-breadcrumb>
            
           <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="购买理财统计页面" name="first">  
              <el-button  icon="el-icon-circle-plus" round @click="incomeAdd(3)">添加</el-button>
              <el-table
                :data="tableData4"
                style="width: 100%"
                :row-class-name="tableRowClassName"         
                >
                <el-table-column
                
                  label="购买日期"
                  width="180">
                  <template slot-scope="scope">
                          <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column               
                  label="到期日期"
                  width="180">
                  <template slot-scope="scope">
                          <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column               
                  label="公司名称"
                  width="180">
                <template slot-scope="scope">
                          <i class="el-icon-star-off"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
              
                  label="购买金额">
                  <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.money" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
                  </template>
                </el-table-column>
                <el-table-column             
                  label="预计本息和">
                  <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.consumerAddress" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
                  </template>
                </el-table-column>    
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.disable">编辑</el-button>
                      <el-button
                      size="mini"
                      @click="handleSave(scope.$index, scope.row)" v-if="!scope.row.disable" type="primary">保存</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="负债统计页面" name="second">
              <el-button  icon="el-icon-circle-plus" round @click="incomeAdd(4)">添加</el-button>
                <el-table
                :data="tableData5"
                style="width: 100%"
                :row-class-name="tableRowClassName"         
                >
                <el-table-column
                
                  label="借款日期"
                  width="180">
                  <template slot-scope="scope">
                          <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.dateStart }}</span>
                  </template>
                </el-table-column>
                <el-table-column               
                  label="到期日期"
                  width="180">
                  <template slot-scope="scope">
                          <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.dateEnd }}</span>
                  </template>
                </el-table-column>
                <el-table-column               
                  label="银行或者个人名称"
                  width="180">
                <template slot-scope="scope">
                          <i class="el-icon-star-off"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
              
                  label="负债金额">
                  <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.money" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
                  </template>
                </el-table-column>
                <el-table-column             
                  label="预计负债本息和">
                  <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.consumerAddress" placeholder="请输入内容" :disabled="scope.row.disable"></el-input> 
                  </template>
                </el-table-column>    
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.disable">编辑</el-button>
                      <el-button
                      size="mini"
                      @click="handleSave(scope.$index, scope.row)" v-if="!scope.row.disable" type="primary">保存</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="图表展示页面" name="third">全面分析负债盈利等情况</el-tab-pane>
              </el-tabs>
        
        </div>
        <div class="financial" v-if="financial">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item> 图表展示</el-breadcrumb-item>
          </el-breadcrumb>
         敬请期待
        </div>
    </el-main>
  </el-container>


     
  

  </el-container>

</template>
<script>
  export default {
     data () {
      return {
        activeName: 'first',
        dialogTableVisible: false,
        dialogFormVisible: false,
        imgUrl:require("../assets/financial.jpg"),
        account: false,
        income: false,
        expenditure: false,
        statistical: false,
        financial: false,
        changetable:"1",
        tableData1: [{
            date: '2016-05-02',
            name: '王小虎',
            pasword:'密码',
            address: '上海市普陀区金沙江路 1518 弄',
            account:"bruobuqi",
            disable:true
          }, {
            date: '2016-05-04',
            name: '王小虎',
            pasword:'密码',
            address: '上海市普陀区金沙江路 1517 弄',
            account:"bruobuqi",
            disable:true
          }, {
            date: '2016-05-01',
            name: '王小虎',
            pasword:'密码',
            address: '上海市普陀区金沙江路 1519 弄',
            account:"bruobuqi",
            disable:true
          }, {
            date: '2016-05-03',
            name: '王小虎',
            pasword:'密码',
            address: '上海市普陀区金沙江路 1516 弄',
            account:"bruobuqi",
            disable:true
        }],
        tableData2: [{
            date: '2016-05-02',
            name: '王小虎',
          
            source: '上海市普陀区金沙江路 1518 弄',
            money:"bruobuqi",
            disable:true
          }, {
            date: '2016-05-04',
            name: '王小虎',
            
            source: '上海市普陀区金沙江路 1517 弄',
            money:"bruobuqi",
            disable:true
          }, {
            date: '2016-05-01',
            name: '王小虎',
          
            source: '上海市普陀区金沙江路 1519 弄',
            money:"bruobuqi",
            disable:true
          }, {
            date: '2016-05-03',
            name: '王小虎',
           
            source: '上海市普陀区金沙江路 1516 弄',
            money:"bruobuqi",
            disable:true
        }],
        tableData3: [{
            date: '2016-05-02',
            name: '王小虎',
           
            money: '上海市普陀区金沙江路 1518 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            date: '2016-05-04',
            name: '王小虎',
            
            money: '上海市普陀区金沙江路 1517 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            date: '2016-05-01',
            name: '王小虎',
           
            money: '上海市普陀区金沙江路 1519 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            date: '2016-05-03',
            name: '王小虎',
            
            money: '上海市普陀区金沙江路 1516 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
        }],
        tableData4: [{
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
            
            address: '上海市普陀区金沙江路 1518 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
           
            address: '上海市普陀区金沙江路 1517 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
          
            address: '上海市普陀区金沙江路 1519 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
           
            address: '上海市普陀区金沙江路 1516 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
        }],
        tableData5: [{
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
           
            address: '上海市普陀区金沙江路 1518 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
            
            address: '上海市普陀区金沙江路 1517 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
       
            address: '上海市普陀区金沙江路 1519 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
          }, {
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
           
            address: '上海市普陀区金沙江路 1516 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:true
        }],
      };
    },
    methods: {
      incomeAdd(item){
        var tableDataTemp=[];      
        if(item==1){
          tableDataTemp.push({
              date: '2016-05-02',
              name: '王小虎',
              source: '00000',
              money:"bruobuqi",
              disable:false
          });
          this.tableData2.forEach(element => {
            tableDataTemp.push(element);
          });
        this.tableData2=tableDataTemp;}
        if(item==2){
          tableDataTemp.push({
             date: '2016-05-02',
            name: '王小虎',
            pasword:'密码',
            money: '上海市普陀区金沙江路 1518 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:false
          });
          this.tableData3.forEach(element => {
            tableDataTemp.push(element);
          });
        this.tableData3=tableDataTemp;}
         if(item==3){
          tableDataTemp.push({
            dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
            pasword:'密码',
            address: '上海市普陀区金沙江路 1517 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:false
          });
          this.tableData4.forEach(element => {
            tableDataTemp.push(element);
          });
        this.tableData4=tableDataTemp;}
        if(item==4){
          tableDataTemp.push({
             dateStart: '2016-05-02',
            dateEnd: '2016-05-02',
            name: '王小虎',
            pasword:'密码',
            address: '上海市普陀区金沙江路 1517 弄',
            consumerAddress:"上海市普陀区金沙江路 1518 弄",
            disable:false
          });
          this.tableData5.forEach(element => {
            tableDataTemp.push(element);
          });
        this.tableData5=tableDataTemp;}
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleEdit(index, row) {
        if(this.changetable=="1"){
         this.tableData1[index].disable=false;
        }
        if(this.changetable=="2"){
         this.tableData2[index].disable=false;
        }
        if(this.changetable=="3"){
         this.tableData3[index].disable=false;
        }
        if(this.changetable=="4"){
         this.tableData4[index].disable=false;
        }
      },
      handleSave(index, row){
         if(this.changetable=="1"){
        this.tableData1[index].date=row.date;

        this.tableData1[index].disable=true;
         }
          if(this.changetable=="2"){
        this.tableData2[index].date=row.date;

        this.tableData2[index].disable=true;
         }
          if(this.changetable=="3"){
        this.tableData3[index].date=row.date;

        this.tableData3[index].disable=true;
         }
          if(this.changetable=="4"){
        this.tableData4[index].date=row.date;

        this.tableData4[index].disable=true;
         }
      },
      handleDelete(index, row) {
         if(this.changetable=="1"){
       this.$delete(this.tableData1,index)
         }
          if(this.changetable=="2"){
       this.$delete(this.tableData2,index)
         }
          if(this.changetable=="3"){
       this.$delete(this.tableData3,index)
         }
          if(this.changetable=="4"){
       this.$delete(this.tableData4,index)
         }
      },
       tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      changetableMethod(key, keyPath) {
        this.changetable=key;
        if("1"==key){
        this.account=true
        this.income= false;
        this.expenditure=false;
        this.statistical= false;
        this.financial= false;
        
        }
         if("2"==key){
        this.account=false
        this.income= true;
        this.expenditure=false;
        this.statistical= false;
        this.financial= false;
        }
         if("3"==key){
        this.account=false
        this.income= false;
        this.expenditure=true;
        this.statistical= false;
        this.financial= false;
        }
         if("4"==key){
        this.account=false
        this.income= false;
        this.expenditure=false;
        this.statistical= true;
        this.financial= false;
        }
         if("5"==key){
        this.account=false
        this.income= false;
        this.expenditure=false;
        this.statistical= false;
        this.financial= true;
        }
      },
       

    }
  }
</script>
<style scoped>
.el-button.is-round {
    margin-left: -92%;
    margin-top: 1%;
}
.el-main[data-v-469af010] {
    text-align: center;
    line-height: 20px;
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
.words[data-v-469af010] {
    position: absolute;
    top: 7px;
    left: 60px;
    font-size: 20px;
    color: blue;
    font-family:courier
}
 .imgSize{
   width: 40px;
   height: 40px ;
    margin-left: -11px;
    margin-top: 10px;
 }
 .el-header {
   background-color: #dadada;
    color: #333;
    text-align: left;
    line-height: 60px;
  }
  .el-row[data-v-469af010] {
    margin-bottom: 20px;
    width: 100%;
}
  .el-aside {
    line-height: 200px;
  }
  
  .el-col-12 {
    width: 100%;
}
.el-row {
    margin-bottom: 19px;
    width: 100%;
}
  .el-main {
   
 
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    height: 1080px;
   
  }
  
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-row {
    margin-bottom: 20px;
   width: 20%;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>